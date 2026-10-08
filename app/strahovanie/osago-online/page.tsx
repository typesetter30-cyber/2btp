import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { InssmartWidget } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оформить ОСАГО онлайн | Технологии Бизнеса",
  description: "Полис ОСАГО онлайн в компании Технологии Бизнеса. Консультация: +7 (383) 210-55-54.",
  path: "/strahovanie/osago-online/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/strahovanie/", label: "Страховые услуги" },
          { label: "ОСАГО онлайн" },
        ]}
      />
      <div className="wrap py-10">
        <h1 className="h1">ОСАГО онлайн</h1>
        <p className="lead mt-4">Оформление полиса в калькуляторе. Если он не загрузился, позвоните или оставьте заявку.</p>
        <div className="mt-8">
          <InssmartWidget
            product="/eosago"
            token="9ea47075-293c-539e-a0dd-534069cb250a"
            secret="3b1398e5-8780-580d-8024-e2b1310cf276"
          />
        </div>
      </div>
    </>
  );
}
