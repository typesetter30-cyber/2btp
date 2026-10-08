"use client";

import { useEffect, useState } from "react";
import { reviews, reviewStats } from "@/lib/reviews";
import { company } from "@/lib/site";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = reviews[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  function go(next: number) {
    setIndex((next + reviews.length) % reviews.length);
  }

  return (
    <div onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="caption">Отзывы на {reviewStats.source}</p>
          <p className="review-score">
            {reviewStats.score}
            <span className="ml-3 align-middle text-base font-sans font-normal tracking-normal text-muted">
              {reviewStats.ratings} · {reviewStats.reviews}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-line review-nav" onClick={() => go(index - 1)} aria-label="Предыдущий отзыв">
            ←
          </button>
          <button type="button" className="btn btn-line review-nav" onClick={() => go(index + 1)} aria-label="Следующий отзыв">
            →
          </button>
        </div>
      </div>
      <figure className="review-card" key={review.name}>
        <blockquote className="review-quote max-w-3xl">«{review.text}»</blockquote>
        <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-semibold">{review.name}</span>
          <span className="caption">{review.topic}</span>
        </figcaption>
      </figure>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap">
          {reviews.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              aria-current={itemIndex === index ? "true" : undefined}
              aria-label={`Отзыв ${itemIndex + 1}: ${item.name}`}
              className="review-dot"
              onClick={() => setIndex(itemIndex)}
            >
              <span className={itemIndex === index ? "review-dot-mark is-active" : "review-dot-mark"} />
            </button>
          ))}
        </div>
        <a href={company.twoGis} className="link small inline-flex min-h-11 items-center" target="_blank" rel="noreferrer">
          Все отзывы на 2ГИС
        </a>
      </div>
    </div>
  );
}
