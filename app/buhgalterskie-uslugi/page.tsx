import { ServiceShell } from "@/components/site/ServiceShell";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const service = services[0];

export const metadata = pageMetadata({
  title: "Бухгалтерские услуги | Технологии Бизнеса",
  description:
    "Бухгалтерское обслуживание, отчётность, налоги, восстановление учёта, учётная политика и кадровый учёт. ООО «Технологии Бизнеса», Новосибирск.",
  path: "/buhgalterskie-uslugi/",
});

export default function Page() {
  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Бухгалтерские услуги" }]}
      eyebrow=""
      title="Бухгалтерские услуги"
      lead="Ведём учёт, сдаём отчётность и разбираем требования налоговой. Отдельного прайса на эту услугу на сайте нет: стоимость называют после уточнения задачи."
      description="Бухгалтерское обслуживание, отчётность, консультации по налогам, восстановление учёта, учётная политика и кадровый учёт."
      path="/buhgalterskie-uslugi/"
    >
      <ul className="rule-list cols-2 mt-10">
        {service.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="mt-12 max-w-3xl">
        <h2 className="h2">Что ещё компания берёт на себя</h2>
        <div className="mt-4 space-y-4 text-muted">
          <p>
            Помогаем зарегистрировать ИП и ООО, подобрать расчётный счёт, даём рекомендации по приобретению и настройке оборудования, организуем документооборот с поставщиками и заказчиками.
          </p>
          <p>
            Предупреждаем о рисках, консультируем и разбираем требования ИФНС. На сайте указано, что у компании есть опыт нестандартных ситуаций, а юристы опираются на действующую судебную практику.
          </p>
        </div>
      </div>
    </ServiceShell>
  );
}
