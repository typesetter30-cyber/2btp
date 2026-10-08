import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PaymentMeta } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оплата не завершена | Технологии Бизнеса",
  description: "Оплата не была завершена.",
  path: "/payment/fail/",
  noIndex: true,
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/payment/", label: "Оплата услуг" },
          { label: "Результат оплаты" },
        ]}
      />
      <section className="wrap max-w-3xl py-14">
        <div className="panel">
          <h1 className="h1">Оплата не завершена</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Платёж был отменён или отклонён, либо окно оплаты закрыли до завершения операции.
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            <strong>Важно:</strong> если банк уже списал деньги, не оплачивайте повторно. Подтверждение иногда приходит с задержкой. Напишите нам ФИО, сумму и назначение платежа.
          </p>
          <PaymentMeta />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/payment/" className="btn btn-primary">
              Попробовать ещё раз
            </Link>
            <Link href="/" className="btn btn-line">
              На главную
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
