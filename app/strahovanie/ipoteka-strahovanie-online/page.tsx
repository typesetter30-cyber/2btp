import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { InssmartWidget } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оформить полис ипотечного страхования онлайн | Технологии Бизнеса",
  description:
    "Полис ипотечного страхования онлайн в компании Технологии Бизнеса. Новосибирск и другие регионы. Консультация: +7 (383) 210-55-54.",
  path: "/strahovanie/ipoteka-strahovanie-online/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/strahovanie/", label: "Страховые услуги" },
          { label: "Ипотечное страхование" },
        ]}
      />
      <div className="wrap py-10">
        <h1 className="h1">Ипотечное страхование онлайн</h1>
        <p className="lead mt-4">Калькулятор полиса. Если блок не открылся, оставьте заявку на странице страхования или позвоните.</p>
        <div className="mt-8">
          <InssmartWidget
            product="/mortgage"
            token="fd8e292c-9f6e-5adc-b59c-d8e346c459e3"
            secret="a4c1a833-7828-58cb-a0fe-0a2cdaf5aa6b"
          />
        </div>
      </div>
    </>
  );
}
