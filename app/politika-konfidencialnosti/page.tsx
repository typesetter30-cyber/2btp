import { PrivacyDocument } from "@/components/legal/Documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Политика конфиденциальности | Технологии Бизнеса",
  description: "Политика конфиденциальности компании Технологии Бизнеса",
  path: "/politika-konfidencialnosti/",
});

export default function Page() {
  return <PrivacyDocument />;
}
