/**
 * Декоративные пятна фона. Чистая разметка, без JS:
 * дрейф и отключение при reduced-motion заданы в animations.css.
 */
export function Aurora({ blobs = 4 }: { blobs?: 3 | 4 }) {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-blob aurora-1" />
      <span className="aurora-blob aurora-2" />
      <span className="aurora-blob aurora-3" />
      {blobs === 4 && <span className="aurora-blob aurora-4" />}
    </div>
  );
}
