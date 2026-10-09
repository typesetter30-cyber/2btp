"use client";

import { useEffect } from "react";
import { createTicker, hasFinePointer, lerp, prefersReducedMotion } from "@/lib/fx";

const MAGNET_RANGE = 110;
const MAGNET_STRENGTH = 0.28;

/**
 * Курсорные эффекты страницы, включаются только при наличии мыши:
 *  — магнитное притяжение кнопок с классом .magnetic;
 *  — свечение за курсором в блоках с .cursor-glow;
 *  — подсветка карточек .card под курсором.
 *
 * Один слушатель pointermove на документ и один rAF-цикл на всё.
 */
export function Interactions() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;

    const ticker = createTicker();
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const glowZones = Array.from(document.querySelectorAll<HTMLElement>("[data-glow]"));

    const state = magnets.map(() => ({ x: 0, y: 0, tx: 0, ty: 0, pulled: false }));
    let needsFrame = false;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      // Магнитные кнопки
      magnets.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const s = state[index];
        if (distance < MAGNET_RANGE) {
          const pull = 1 - distance / MAGNET_RANGE;
          s.tx = dx * pull * MAGNET_STRENGTH;
          s.ty = dy * pull * MAGNET_STRENGTH;
          if (!s.pulled) {
            s.pulled = true;
            node.classList.add("is-pulled");
          }
        } else if (s.pulled) {
          s.tx = 0;
          s.ty = 0;
        }
      });

      // Свечение в зонах и подсветка карточек
      for (const zone of glowZones) {
        const rect = zone.getBoundingClientRect();
        if (event.clientY < rect.top - 80 || event.clientY > rect.bottom + 80) {
          zone.classList.remove("is-pointing");
          continue;
        }
        zone.classList.add("is-pointing");
        zone.style.setProperty("--gx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        zone.style.setProperty("--gy", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }

      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(".card");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }

      needsFrame = true;
    }

    const stop = ticker.add(() => {
      if (!needsFrame) return;
      let moving = false;
      magnets.forEach((node, index) => {
        const s = state[index];
        s.x = lerp(s.x, s.tx, 0.2);
        s.y = lerp(s.y, s.ty, 0.2);
        if (Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1) moving = true;
        node.style.setProperty("--pull-x", `${s.x.toFixed(2)}px`);
        node.style.setProperty("--pull-y", `${s.y.toFixed(2)}px`);
        if (!moving && s.pulled && s.tx === 0 && s.ty === 0) {
          s.pulled = false;
          node.classList.remove("is-pulled");
          node.style.removeProperty("--pull-x");
          node.style.removeProperty("--pull-y");
        }
      });
      if (!moving) needsFrame = false;
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      stop();
      ticker.stop();
    };
  }, []);

  return null;
}
