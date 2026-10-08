import type { TableRow } from "@/lib/prices";

function isSection(row: TableRow): row is { section: string } {
  return typeof row === "object" && "section" in row;
}

export function PriceTable({
  caption,
  columns,
  rows,
  note,
}: {
  caption: string;
  columns: string[];
  rows: TableRow[];
  note?: string;
}) {
  return (
    <figure className="mt-12">
      <figcaption className="h3">{caption}</figcaption>
      {note && <p className="small mt-3 max-w-3xl text-muted">{note}</p>}

      <div className="price-cards mt-4 lg:hidden">
        {rows.map((row, index) =>
          isSection(row) ? (
            <p key={`section-${row.section}`} className="price-card-section">
              {row.section}
            </p>
          ) : (
            <article key={`${row[0]}-${index}`} className="price-card">
              <h4>{row[0]}</h4>
              <dl>
                {columns.slice(1).map((column, cellIndex) => (
                  <div key={column}>
                    <dt>{column}</dt>
                    <dd>{row[cellIndex + 1]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ),
        )}
      </div>

      <div className="price-wrap mt-4 hidden overflow-x-auto border border-line bg-card lg:block">
        <table className="price-table w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper">
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-medium text-ink">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) =>
              isSection(row) ? (
                <tr key={`section-${row.section}`} className="border-b border-line bg-paper-2/60">
                  <th colSpan={columns.length} scope="colgroup" className="px-4 py-3 text-center font-serif text-base font-medium">
                    {row.section}
                  </th>
                </tr>
              ) : (
                <tr key={`${row[0]}-${index}`} className="border-b border-line last:border-0">
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cell} scope="row" className="max-w-[280px] px-4 py-3 align-top font-medium text-ink">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top text-muted">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
