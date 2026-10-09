"use client";

import { useEffect, useRef } from "react";

/**
 * Оживляет первый экран: шары догоняют курсор с разной инерцией,
 * заголовок и фото наклоняются, блик на заголовке идёт за курсором.
 * Всё выключено при prefers-reduced-motion и на устройствах без мыши.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const title = root.querySelector<HTMLElement>(".hero-title");
    const photo = root.querySelector<HTMLElement>(".hero-photo");
    const magnet = root.querySelector<HTMLElement>(".hero .btn-primary");
    const MAGNET_RANGE = 120;

    let pointerX = 0;
    let pointerY = 0;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !root) return;
      const rect = root.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;

      if (title) {
        title.style.setProperty("--mx", `${(event.clientX - rect.left) / rect.width * 100}%`);
        title.style.setProperty("--my", `${(event.clientY - rect.top) / rect.height * 100}%`);
        title.style.setProperty("--tilt-y", `${pointerX * 5}deg`);
        title.style.setProperty("--tilt-x", `${-pointerY * 4}deg`);
      }
      if (photo) {
        photo.style.setProperty("--tilt-y", `${pointerX * 4}deg`);
        photo.style.setProperty("--tilt-x", `${-pointerY * 3}deg`);
      }

      // Кнопка слегка тянется к курсору, когда он рядом
      if (magnet) {
        const b = magnet.getBoundingClientRect();
        const dx = event.clientX - (b.left + b.width / 2);
        const dy = event.clientY - (b.top + b.height / 2);
        const distance = Math.hypot(dx, dy);
        if (distance < MAGNET_RANGE) {
          const pull = 1 - distance / MAGNET_RANGE;
          magnet.style.setProperty("--pull-x", `${dx * pull * 0.3}px`);
          magnet.style.setProperty("--pull-y", `${dy * pull * 0.3}px`);
          magnet.classList.add("is-pulled");
        } else if (magnet.classList.contains("is-pulled")) {
          magnet.classList.remove("is-pulled");
          magnet.style.removeProperty("--pull-x");
          magnet.style.removeProperty("--pull-y");
        }
      }

    }

    function onLeave() {
      title?.style.removeProperty("--tilt-x");
      title?.style.removeProperty("--tilt-y");
      photo?.style.removeProperty("--tilt-x");
      photo?.style.removeProperty("--tilt-y");
      magnet?.classList.remove("is-pulled");
      magnet?.style.removeProperty("--pull-x");
      magnet?.style.removeProperty("--pull-y");
    }

    root.classList.add("is-live");
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("is-live");
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-stage">
      {children}
    </div>
  );
}
