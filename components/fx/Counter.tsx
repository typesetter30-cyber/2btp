"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/fx";

/**
 * Счётчик, отсчитывающий от нуля при появлении в кадре.
 *
 * Конечное значение всегда есть в разметке на сервере, поэтому
 * без JS и при prefers-reduced-motion виден сразу итоговый текст.
 */
export function Counter({
  value,
  from = 0,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  /** Год нет смысла отсчитывать от нуля — старт задаётся явно. */
  from?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    setShown(from);
    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const step = (time: number) => {
          if (!start) start = time;
          const progress = Math.min((time - start) / duration, 1);
          // мягкое замедление к концу
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(Math.round((from + (value - from) * eased) * 10) / 10);
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from, duration]);

  const text = Number.isInteger(value) ? Math.round(shown).toString() : shown.toFixed(1);

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}
