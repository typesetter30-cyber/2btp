"use client";

import { useEffect, useRef } from "react";

type Orb = {
  el: HTMLElement;
  /** доля смещения от курсора: разная у каждого шара — отсюда глубина */
  depth: number;
  /** текущая позиция, догоняет цель с инерцией */
  x: number;
  y: number;
  tx: number;
  ty: number;
};

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

    const orbs: Orb[] = Array.from(root.querySelectorAll<HTMLElement>(".hero-orb")).map((el, index) => ({
      el,
      depth: [26, 44, 18, 34][index] ?? 24,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
    }));

    const title = root.querySelector<HTMLElement>(".hero-title");
    const photo = root.querySelector<HTMLElement>(".hero-photo");
    const magnet = root.querySelector<HTMLElement>(".hero .btn-primary");
    const MAGNET_RANGE = 120;

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let running = false;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !root) return;
      const rect = root.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;

      for (const orb of orbs) {
        orb.tx = pointerX * orb.depth;
        orb.ty = pointerY * orb.depth;
      }

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

      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    }

    function step() {
      let moving = false;
      for (const orb of orbs) {
        orb.x += (orb.tx - orb.x) * 0.06;
        orb.y += (orb.ty - orb.y) * 0.06;
        if (Math.abs(orb.tx - orb.x) > 0.1 || Math.abs(orb.ty - orb.y) > 0.1) moving = true;
        orb.el.style.setProperty("--ox", `${orb.x.toFixed(2)}px`);
        orb.el.style.setProperty("--oy", `${orb.y.toFixed(2)}px`);
      }
      if (moving) {
        frame = requestAnimationFrame(step);
      } else {
        running = false;
      }
    }

    function onLeave() {
      for (const orb of orbs) {
        orb.tx = 0;
        orb.ty = 0;
      }
      title?.style.removeProperty("--tilt-x");
      title?.style.removeProperty("--tilt-y");
      photo?.style.removeProperty("--tilt-x");
      photo?.style.removeProperty("--tilt-y");
      magnet?.classList.remove("is-pulled");
      magnet?.style.removeProperty("--pull-x");
      magnet?.style.removeProperty("--pull-y");
      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    }

    root.classList.add("is-live");
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("is-live");
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-stage">
      <div className="hero-orbs" aria-hidden="true">
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-orb hero-orb-3" />
        <span className="hero-orb hero-orb-4" />
      </div>
      {children}
    </div>
  );
}
