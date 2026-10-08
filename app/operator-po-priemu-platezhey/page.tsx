import Link from "next/link";
import { ServiceShell } from "@/components/site/ServiceShell";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оператор по приему платежей — услуги для юридических лиц | Технологии Бизнеса",
  description:
    "ООО «Технологии Бизнеса» — оператор по приёму платежей, включённый в реестр ЦБ РФ. Приём и обработка платежей в пользу юридических лиц, документы и чеки.",
  path: "/operator-po-priemu-platezhey/",
});

export default function Page() {
  return (
    <ServiceShell
      crumbs={[{ href: "/", label: "Главная" }, { label: "Оператор по приёму платежей" }]}
      eyebrow="Для бизнеса"
      title="Оператор по приёму платежей"
      lead="ООО «Технологии Бизнеса» включено в реестр платёжных агентов Центрального банка РФ. Это отдельная услуга, не путать с оплатой наших собственных работ."
      description="Приём и обработка платежей в пользу юридических лиц. Компания включена в реестр платёжных агентов Банка России."
      path="/operator-po-priemu-platezhey/"
    >
      <div className="mt-10 max-w-3xl space-y-4 text-muted">
        <p>
          Решение ЦБ РФ от 13.08.2024 № 14-51/5297. Компания предлагает полный цикл услуг по приёму платежей в пользу юридических лиц: от приёма средств до отправки конечному получателю, с документами и чеками.
        </p>
        <p>Чтобы обсудить договор, напишите в Telegram или оставьте заявку.</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={company.paymentsTelegram} target="_blank" rel="noreferrer" className="btn btn-primary">
          Telegram по приёму платежей
        </a>
        <Link href="/payment/" className="link">
          Оплатить услугу самой компании
        </Link>
      </div>
    </ServiceShell>
  );
}
