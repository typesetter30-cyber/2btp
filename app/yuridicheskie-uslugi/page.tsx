import { PriceTable } from "@/components/site/PriceTable";
import { ServiceShell } from "@/components/site/ServiceShell";
import { legalBrokerRows, legalPackageRows } from "@/lib/prices";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Юридические услуги и консультации | Технологии Бизнеса",
  description:
    "Юридическая помощь по недвижимости, наследованию и семейным спорам в Новосибирске, области и по России. Компания Технологии Бизнеса, +7 (383) 210-55-54.",
  path: "/yuridicheskie-uslugi/",
});

export default function Page() {
  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Юридические услуги" }]}
      eyebrow=""
      title="Юридические услуги"
      lead="Консультации, договоры, претензии и представительство. Первый прайс на сайте подписан как прайс для брокеров, пакет — для агентств недвижимости."
      description="Консультации по недвижимости, наследованию и семейным спорам, защита прав потребителей, представительство в суде."
      path="/yuridicheskie-uslugi/"
    >
      <ul className="rule-list cols-2 mt-10">
        {services[5].points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <PriceTable caption="Прайс для брокеров" columns={["Услуга", "Сумма"]} rows={legalBrokerRows} />
      <PriceTable
        caption="Пакет «ОПТИМА» для агентств недвижимости на 12 месяцев"
        columns={["Услуга", "Объём"]}
        rows={legalPackageRows}
      />
    </ServiceShell>
  );
}
