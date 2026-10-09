"use client";

import { useEffect } from "react";
import { prefersReducedMotion, releaseWillChange, splitWords } from "@/lib/fx";

/**
 * Появление элементов при прокрутке.
 *
 * Разметка размечается атрибутами: data-reveal, data-reveal="left|right|scale".
 * Скрытое состояние включает класс .reveal-ready на <html> — он ставится
 * отсюда, поэтому без JS контент остаётся видимым.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) return;
    if (!("IntersectionObserver" in window)) return;

    root.classList.add("reveal-ready");

    // Заголовки с data-split проявляются по словам
    document.querySelectorAll<HTMLElement>("[data-split]").forEach(splitWords);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          node.classList.add("is-visible");
          releaseWillChange(node);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    nodes.forEach((node) => {
      node.style.willChange = "opacity, transform";
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
