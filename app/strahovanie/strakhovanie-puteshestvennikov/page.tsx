import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { InssmartWidget } from "@/components/widgets/Tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Страхование путешественников — оформить туристическую страховку онлайн | Технологии Бизнеса",
  description:
    "Страхование путешественников онлайн. Медицинская страховка для поездок. Консультация: +7 (383) 210-55-54.",
  path: "/strahovanie/strakhovanie-puteshestvennikov/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/strahovanie/", label: "Страховые услуги" },
          { label: "Страхование путешественников" },
        ]}
      />
      <div className="wrap py-10">
        <h1 className="h1">Страхование путешественников</h1>
        <p className="lead mt-4">Калькулятор туристической страховки.</p>
        <div className="mt-8">
          <InssmartWidget
            product="/travel"
            token="99ab9749-1c2b-5266-a07a-a292a1610b27"
            secret="dccffef3-e8c2-5f91-be99-3b44972444a4"
          />
        </div>
      </div>
    </>
  );
}
