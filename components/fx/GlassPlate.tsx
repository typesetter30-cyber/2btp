"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, createTicker, hasFinePointer, lerp, prefersReducedMotion } from "@/lib/fx";
import { company } from "@/lib/site";

/**
 * Стеклянная плашка с логотипом, вращающаяся при прокрутке.
 *
 * Основной путь — CSS scroll-driven анимация (см. animations.css).
 * Если браузер её не умеет, включается класс .is-js-driven и углы
 * считает rAF с lerp-сглаживанием: движение инерционное, не дёрганое.
 * По наведению добавляется наклон за курсором поверх базового угла.
 */
export function GlassPlate() {
  const plateRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const plate = plateRef.current;
    const section = sectionRef.current;
    if (!plate || !section) return;
    if (prefersReducedMotion()) return;

    const ticker = createTicker();
    const cleanups: Array<() => void> = [];

    const supportsScrollTimeline =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");

    // --- Запасной путь: вращение по скроллу считаем сами ---
    if (!supportsScrollTimeline) {
      plate.classList.add("is-js-driven");
      const maxY = parseFloat(getComputedStyle(plate).getPropertyValue("--plate-rotate-y")) || 20;
      const maxX = parseFloat(getComputedStyle(plate).getPropertyValue("--plate-rotate-x")) || 12;
      let targetProgress = 0;
      let progress = 0;

      const readProgress = () => {
        const rect = section.getBoundingClientRect();
        const span = rect.height + window.innerHeight;
        targetProgress = clamp((window.innerHeight - rect.top) / span, 0, 1);
      };

      readProgress();
      window.addEventListener("scroll", readProgress, { passive: true });
      window.addEventListener("resize", readProgress, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", readProgress);
        window.removeEventListener("resize", readProgress);
      });

      cleanups.push(
        ticker.add(() => {
          progress = lerp(progress, targetProgress, 0.09);
          const t = progress * 2 - 1; // -1 … 1
          plate.style.setProperty("--ry", `${(t * maxY).toFixed(2)}deg`);
          plate.style.setProperty("--rx", `${(-t * maxX).toFixed(2)}deg`);
        }),
      );
    }

    // --- Наклон за курсором поверх базового угла ---
    if (hasFinePointer()) {
      let tiltY = 0;
      let tiltX = 0;
      let targetTiltY = 0;
      let targetTiltX = 0;
      let active = false;

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = plate.getBoundingClientRect();
        targetTiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        targetTiltX = (0.5 - (event.clientY - rect.top) / rect.height) * 8;
        active = true;
      };

      const onLeave = () => {
        targetTiltY = 0;
        targetTiltX = 0;
      };

      plate.addEventListener("pointermove", onMove, { passive: true });
      plate.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        plate.removeEventListener("pointermove", onMove);
        plate.removeEventListener("pointerleave", onLeave);
      });

      cleanups.push(
        ticker.add(() => {
          if (!active) return;
          tiltY = lerp(tiltY, targetTiltY, 0.1);
          tiltX = lerp(tiltX, targetTiltX, 0.1);
          plate.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
          plate.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        }),
      );
    }

    return () => {
      for (const fn of cleanups) fn();
      ticker.stop();
      plate.classList.remove("is-js-driven");
    };
  }, []);

  return (
    <section ref={sectionRef} className="section band band-deep dotted plate-section" aria-labelledby="plate-title">
      <div className="aurora" aria-hidden="true">
        <span className="aurora-blob aurora-1" />
        <span className="aurora-blob aurora-2" />
        <span className="aurora-blob aurora-3" />
      </div>
      <div className="wrap">
        <div className="plate-stage">
          <div ref={plateRef} className="plate">
            <div className="plate-tilt">
            <Image
              src="/brand/logo.png"
              alt=""
              width={72}
              height={72}
              className="plate-logo h-14 w-14"
            />
            <p id="plate-title" className="plate-name">
              {company.name}
            </p>
            <p className="plate-sub">{company.legalName}</p>
            <p className="plate-meta">
              <span>ИНН {company.inn}</span>
              <span>ОГРН {company.ogrn}</span>
              <span>с {company.startYear} года</span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
