import Link from "next/link";
import { ServiceShell } from "@/components/site/ServiceShell";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const service = services[1];

export const metadata = pageMetadata({
  title: "Ипотечный брокер | Технологии Бизнеса",
  description:
    "Подбор ипотечной программы, рефинансирование, анализ кредитной истории и рекомендации по кредитному рейтингу. ООО «Технологии Бизнеса», Новосибирск.",
  path: "/ipotechnyj-broker/",
});

export default function Page() {
  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Ипотечный брокер" }]}
      eyebrow=""
      title="Ипотечный брокер"
      lead="Ипотечные менеджеры подбирают предложения банков по ипотеке и другим банковским продуктам. Ставки и перечень банков на сайте не опубликованы."
      description="Подбор ипотечной программы, рефинансирование, анализ кредитной истории и рекомендации по улучшению кредитного рейтинга."
      path="/ipotechnyj-broker/"
    >
      <ol className="rule-list mt-10">
        {service.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>
      <p className="mt-10 max-w-3xl leading-relaxed text-muted">
        Если ипотека уже подобрана, отдельно можно оформить полис. Основная специализация страхового направления компании —{" "}
        <Link href="/strahovanie/ipoteka-strahovanie-online/" className="text-ink underline">
          ипотечное страхование
        </Link>
        .
      </p>
    </ServiceShell>
  );
}
