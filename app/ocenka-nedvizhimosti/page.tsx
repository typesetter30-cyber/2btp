import { Callout } from "@/components/site/Callout";
import { PriceTable } from "@/components/site/PriceTable";
import { ServiceShell } from "@/components/site/ServiceShell";
import { appraisalFootnotes, appraisalNotes, appraisalTables } from "@/lib/prices";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оценка недвижимости | Оценка объектов и стоимости | Технологии Бизнеса",
  description:
    "Оценка стоимости объектов недвижимости в Новосибирске, области и по России. Компания Технологии Бизнеса, телефон +7 (383) 210-55-54.",
  path: "/ocenka-nedvizhimosti/",
});

export default function Page() {
  const documents = services[4].points.slice(1);

  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Оценка недвижимости" }]}
      eyebrow=""
      title="Оценка недвижимости и документы"
      lead="Оцениваем объекты для банка, нотариуса, суда и для справки. Суммы ниже перенесены с действующего прайса и остаются ориентировочными."
      description="Оценка недвижимости, земли, коммерческих объектов, транспорта, оборудования и бизнеса. Оформление имущественных документов."
      path="/ocenka-nedvizhimosti/"
    >
      <section className="mt-12">
        <h2 className="h2">Оформление документов</h2>
        <ul className="rule-list cols-2 mt-5">
          {documents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-4">
          <Callout title="Стоимость документов">
            Подробный прайс оформления документов на сайте не опубликован. Стоимость приватизации, перепланировки и регистрации права уточняйте в заявке.
          </Callout>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="h2">Ориентировочные расценки</h2>
        <p className="small mt-3 max-w-3xl text-muted">Суммы в рублях. Оценка домов для КРТ — от 23 000 руб., заключение — от 10 000 руб.</p>
        {appraisalTables.map((table) => (
          <PriceTable key={table.id} caption={table.caption} columns={table.columns} rows={table.rows} note={table.note} />
        ))}
        <h3 className="h3 mt-10">Сноски к таблицам</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {appraisalFootnotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="h3 mt-8">Примечания</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {appraisalNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </ServiceShell>
  );
}
