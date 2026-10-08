import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AlfaApartmentWidget } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Оформить полис страхования квартиры онлайн | Технологии Бизнеса",
  description: "Полис страхования квартиры онлайн в компании Технологии Бизнеса. Консультация: +7 (383) 210-55-54.",
  path: "/strahovanie/strahovanie-kvartiry-online/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/strahovanie/", label: "Страховые услуги" },
          { label: "Страхование квартиры" },
        ]}
      />
      <div className="wrap py-10">
        <h1 className="h1">Страхование квартиры онлайн</h1>
        <p className="lead mt-4">Оформление полиса через виджет АльфаСтрахование.</p>
        <div className="mt-8">
          <AlfaApartmentWidget />
        </div>
      </div>
    </>
  );
}
