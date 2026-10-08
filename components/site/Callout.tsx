export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="callout small">
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1 text-muted">{children}</div>
    </aside>
  );
}
