import Image from "next/image";
import Link from "next/link";
import { Callout } from "@/components/site/Callout";
import { PriceTable } from "@/components/site/PriceTable";
import { ServiceShell } from "@/components/site/ServiceShell";
import { company, insurers } from "@/lib/site";
import { insurancePrices, insuranceProducts } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";

const online = [
  { href: "/strahovanie/ipoteka-strahovanie-online/", label: "Ипотечное страхование" },
  { href: "/strahovanie/strahovanie-kvartiry-online/", label: "Страхование квартиры" },
  { href: "/strahovanie/osago-online/", label: "ОСАГО" },
  { href: "/strahovanie/strakhovanie-puteshestvennikov/", label: "Страхование путешественников" },
];

export const metadata = pageMetadata({
  title: "Страховой полис | Технологии Бизнеса",
  description:
    "Оформление страхового полиса и другие виды страхования в компании Технологии Бизнеса. Новосибирск, область и другие регионы России. +7 (383) 210-55-54.",
  path: "/strahovanie/",
});

export default function Page() {
  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Страховые услуги" }]}
      eyebrow=""
      title="Страховые услуги"
      lead="Подбираем программы, помогаем с убытком и с расторжением навязанного полиса. Часть полисов можно оформить на сайте самостоятельно."
      description="Подбор страховых программ, ипотечное страхование, имущество, авто, жизнь, ДМС и помощь при убытках."
      path="/strahovanie/"
    >
      <section className="mt-12">
        <h2 className="h2">Оформить самостоятельно</h2>
        <div className="text-index mt-5">
          {online.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={company.osgopHref} target="_blank" rel="noreferrer">
            ОСГОП такси
            <span>Ингосстрах</span>
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="h2">Виды продуктов</h2>
        <ul className="rule-list cols-2 mt-5">
          {insuranceProducts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="h2">Убытки и расторжение</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          <li>Консультации по нюансам страхования и страховым событиям.</li>
          <li>Помогаем расторгнуть навязанные договоры и вернуть оплаченную страховую премию.</li>
        </ul>
        <PriceTable caption="Стоимость консультаций" columns={["Услуга", "Стоимость"]} rows={insurancePrices} />
      </section>

      <section className="mt-12">
        <h2 className="h2">Агентские договоры</h2>
        <p className="small mt-3 max-w-2xl text-muted">Логотипы ведут на сайты страховых компаний.</p>
        <ul className="logo-rail">
          {insurers.map((partner) => (
            <li key={partner.name}>
              <a href={partner.href} target="_blank" rel="noreferrer">
                {partner.logo?.endsWith(".svg") ? (
                  <img src={partner.logo} alt={partner.name} />
                ) : (
                  <Image src={partner.logo || ""} alt={partner.name} width={128} height={32} />
                )}
              </a>
            </li>
          ))}
        </ul>
        <Callout title="Базовый стандарт">
          <a href={company.standardPdf} target="_blank" rel="noreferrer" className="text-ink underline">
            Базовый стандарт защиты прав получателей финансовых услуг
          </a>
          , оказываемых членами саморегулируемых организаций, объединяющих страховые организации.
        </Callout>
      </section>
    </ServiceShell>
  );
}
