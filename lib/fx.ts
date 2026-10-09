/**
 * Утилиты для эффектов. Чистые функции без зависимостей:
 * React-компоненты в components/fx/ только дёргают их.
 */

/** Пользователь попросил меньше движения — все эффекты выключаются. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Есть ли мышь. Курсорные эффекты только для неё. */
export function hasFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Линейная интерполяция: даёт инерцию вместо рывков. */
export function lerp(current: number, target: number, factor = 0.09) {
  return current + (target - current) * factor;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Один rAF-цикл на подписчиков. Так scroll- и pointer-обработчики
 * не плодят собственные кадры.
 */
export function createTicker() {
  const subscribers = new Set<(time: number) => void>();
  let frame = 0;

  function loop(time: number) {
    for (const fn of subscribers) fn(time);
    frame = subscribers.size ? requestAnimationFrame(loop) : 0;
  }

  return {
    add(fn: (time: number) => void) {
      subscribers.add(fn);
      if (!frame) frame = requestAnimationFrame(loop);
      return () => {
        subscribers.delete(fn);
        if (!subscribers.size && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      };
    },
    stop() {
      subscribers.clear();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

/**
 * Разбивает текст узла на слова, обёрнутые в span с индексом.
 * Текст остаётся в DOM целиком, поэтому скринридеры и поиск
 * читают его как обычно.
 */
export function splitWords(node: HTMLElement) {
  if (node.dataset.split === "done") return;
  const text = node.textContent ?? "";
  if (!text.trim()) return;
  const words = text.split(/(\s+)/);
  const fragment = document.createDocumentFragment();
  let index = 0;
  for (const part of words) {
    if (!part.trim()) {
      fragment.appendChild(document.createTextNode(part));
      continue;
    }
    const span = document.createElement("span");
    span.className = "split-word";
    span.style.setProperty("--w", String(index));
    span.textContent = part;
    fragment.appendChild(span);
    index += 1;
  }
  node.replaceChildren(fragment);
  node.dataset.split = "done";
}

/** Снимает will-change, когда анимация закончилась. */
export function releaseWillChange(node: HTMLElement, after = 1200) {
  window.setTimeout(() => {
    node.style.willChange = "";
  }, after);
}
