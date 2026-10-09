"use client";

import { useEffect, useRef } from "react";

type Blob = {
  /** базовая позиция в долях экрана */
  bx: number;
  by: number;
  /** амплитуда и скорость дрейфа по двум осям */
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  phase: number;
  radius: number;
  color: [number, number, number];
  /** насколько пятно тянется к курсору */
  pull: number;
};

const BLOBS: Blob[] = [
  { bx: 0.82, by: 0.12, ax: 0.1, ay: 0.08, sx: 0.00007, sy: 0.00009, phase: 0.0, radius: 0.52, color: [222, 42, 27], pull: 0.055 },
  { bx: 0.12, by: 0.3, ax: 0.12, ay: 0.1, sx: 0.00005, sy: 0.00008, phase: 1.7, radius: 0.46, color: [46, 104, 200], pull: 0.085 },
  { bx: 0.68, by: 0.72, ax: 0.14, ay: 0.09, sx: 0.00006, sy: 0.00005, phase: 3.1, radius: 0.44, color: [134, 84, 198], pull: 0.04 },
  { bx: 0.26, by: 0.86, ax: 0.1, ay: 0.11, sx: 0.00008, sy: 0.00006, phase: 4.4, radius: 0.4, color: [22, 150, 176], pull: 0.07 },
  { bx: 0.5, by: 0.5, ax: 0.16, ay: 0.12, sx: 0.00004, sy: 0.00007, phase: 2.2, radius: 0.36, color: [236, 118, 60], pull: 0.03 },
];

/** Канва рисуется в четверть разрешения: пятна мягкие, разницы не видно. */
const SCALE = 0.14;
const FRAME_MS = 1000 / 30;

export function LiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let pointerX = 0.5;
    let pointerY = 0.4;
    let targetX = 0.5;
    let targetY = 0.4;
    let scrollShift = 0;
    let frame = 0;
    let last = 0;

    function resize() {
      if (!canvas) return;
      width = Math.max(1, Math.round(window.innerWidth * SCALE));
      height = Math.max(1, Math.round(window.innerHeight * SCALE));
      canvas.width = width;
      canvas.height = height;
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.fillStyle = "#f3f5fa";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "multiply";

      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;

      for (const blob of BLOBS) {
        const t = still ? 0 : time;
        const x =
          (blob.bx + Math.sin(t * blob.sx + blob.phase) * blob.ax + (pointerX - 0.5) * blob.pull) * width;
        const y =
          (blob.by + Math.cos(t * blob.sy + blob.phase) * blob.ay + (pointerY - 0.5) * blob.pull + scrollShift) *
          height;
        const r = blob.radius * Math.max(width, height);
        const [cr, cg, cb] = blob.color;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.34)`);
        gradient.addColorStop(0.55, `rgba(${cr}, ${cg}, ${cb}, 0.11)`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    }

    function loop(time: number) {
      if (time - last >= FRAME_MS) {
        last = time;
        draw(time);
      }
      frame = requestAnimationFrame(loop);
    }

    function onPointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX / window.innerWidth;
      targetY = event.clientY / window.innerHeight;
    }

    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollShift = max > 0 ? (window.scrollY / max) * -0.22 : 0;
    }

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    if (!still) {
      window.addEventListener("scroll", onScroll, { passive: true });
      if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
      frame = requestAnimationFrame(loop);
    } else {
      draw(0);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="live-backdrop" aria-hidden="true" />;
}
