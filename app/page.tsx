import { HomePage } from "@/components/home/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Услуги для бизнеса и физических лиц | Технологии Бизнеса",
  description:
    "Помощь бизнесу и частным клиентам: бухгалтерия, ипотека, страхование, приём платежей, оценка недвижимости и юридические услуги. Новосибирск, ООО «Технологии Бизнеса».",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
