"use client";

import { useEffect, useRef } from "react";
import { clamp, createTicker } from "@/lib/fx";

/**
 * Полоска прогресса прокрутки вверху страницы.
 * Читает позицию в rAF, пишет только CSS-переменную — без layout.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ticker = createTicker();
    let dirty = true;
    let last = -1;

    const markDirty = () => {
      dirty = true;
    };

    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("resize", markDirty, { passive: true });

    const stop = ticker.add(() => {
      if (!dirty) return;
      dirty = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      if (Math.abs(value - last) < 0.001) return;
      last = value;
      bar.style.setProperty("--progress", value.toFixed(4));
    });

    return () => {
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("resize", markDirty);
      stop();
      ticker.stop();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
