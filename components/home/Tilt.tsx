"use client";

import { useRef, useState } from "react";

const MAX_DEG = 6;

/**
 * Лёгкий 3D-наклон за курсором. Рендерит один элемент, чтобы не ломать
 * разметку списков. Ограничения (мышь, prefers-reduced-motion) заданы
 * в CSS — здесь только координаты курсора.
 */
export function Tilt({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--tilt-y", `${(px - 0.5) * 2 * MAX_DEG}deg`);
    node.style.setProperty("--tilt-x", `${(0.5 - py) * 2 * MAX_DEG}deg`);
    node.style.setProperty("--spot-x", `${px * 100}%`);
    node.style.setProperty("--spot-y", `${py * 100}%`);
    if (!active) setActive(true);
  }

  function reset() {
    const node = ref.current;
    if (node) {
      node.style.removeProperty("--tilt-x");
      node.style.removeProperty("--tilt-y");
    }
    setActive(false);
  }

  return (
    <div
      ref={ref}
      className={`tilt ${active ? "is-tilting" : ""} ${className}`.trim()}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}
