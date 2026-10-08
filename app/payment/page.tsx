import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PaymentForm } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оплата услуг компании | Технологии Бизнеса",
  description: "Онлайн-оплата услуг ООО «Технологии Бизнеса».",
  path: "/payment/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Оплата услуг" }]} />
      <div className="wrap split py-10 md:py-14">
        <div>
          <h1 className="h1">Оплата услуг</h1>
          <p className="lead mt-4">
            Форма для оплаты работ самой компании. Приём платежей в пользу других юридических лиц — на странице оператора.
          </p>
          <p className="small mt-4 text-muted">
            Кнопка банка включается после согласия на обработку данных. Если деньги уже списались, а подтверждение не открылось, не платите второй раз.
          </p>
        </div>
        <div className="panel">
          <PaymentForm />
        </div>
      </div>
    </>
  );
}
