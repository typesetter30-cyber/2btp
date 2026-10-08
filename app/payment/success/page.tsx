import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PaymentMeta } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оплата прошла | Технологии Бизнеса",
  description: "Оплата успешно выполнена.",
  path: "/payment/success/",
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
          <h1 className="h1">Оплата прошла успешно</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Спасибо. Банк подтвердил платёж. Если вы указали электронную почту, чек или уведомление могло прийти туда.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Если не уверены, что платёж прошёл, не оплачивайте повторно. Свяжитесь с нами и сообщите ФИО, сумму и назначение платежа.
          </p>
          <PaymentMeta />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/payment/" className="btn btn-primary">
              Вернуться к оплате
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
