import { ConsentDocument } from "@/components/legal/Documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Согласие на обработку персональных данных | Технологии Бизнеса",
  description: "Согласие на обработку персональных данных компанией Технологии Бизнеса",
  path: "/obrabotka-personalnyh-dannyh/",
});

export default function Page() {
  return <ConsentDocument />;
}
