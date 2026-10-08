import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Callout } from "@/components/site/Callout";
import { ConsultForm } from "@/components/site/Consult";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Адрес компании Технологии Бизнеса",
  description: "Адрес, телефон и график работы ООО «Технологии Бизнеса» в Новосибирске.",
  path: "/contacts/",
});

const links = [
  ["Telegram", company.telegram],
  ["ВКонтакте", company.vk],
  ["Одноклассники", company.ok],
  ["Отзывы на 2ГИС", company.twoGis],
  ["Яндекс Карты", company.yandexMaps],
] as const;

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Контакты" }]} />
      <div className="wrap split py-10 md:py-14">
        <div>
          <h1 className="h1">Контакты</h1>
          <p className="lead mt-4">{company.legalName}</p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="text-muted">ИНН / ОГРН</dt>
              <dd className="mt-1">
                {company.inn} / {company.ogrn}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Юридический адрес</dt>
              <dd className="mt-1">{company.legalAddress}</dd>
            </div>
            <div>
              <dt className="text-muted">Адрес в подвале сайта</dt>
              <dd className="mt-1">{company.footerAddress}</dd>
            </div>
            <div>
              <dt className="text-muted">Телефон</dt>
              <dd className="mt-1">
              <a href={company.phoneHref} className="inline-flex min-h-11 items-center font-medium">
                  {company.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Почта</dt>
              <dd className="mt-1">
                <a href={company.emailHref} className="inline-flex min-h-11 items-center">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">График</dt>
              <dd className="mt-1">
                {company.hours}. {company.weekend}.
              </dd>
            </div>
          </dl>
          <Callout title="Два адреса">
            Юридический адрес — ул. Каменская, 58. В подвале указана ул. Фрунзе, 18/1. Какой из них является офисом для визита, на сайте прямо не сказано. Карта ниже перенесена с прежней версии: сверьте точку перед поездкой.
          </Callout>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {links.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2 className="h2">Написать</h2>
          <p className="small mt-2 text-muted">Имя, телефон и согласие на обработку данных.</p>
          <ConsultForm className="mt-6" topic="" />
        </div>
      </div>
      <iframe
        title="Карта компании Технологии Бизнеса"
        src={company.mapEmbed}
        className="map-embed h-[240px] w-full border-0 md:h-[420px]"
        loading="lazy"
      />
    </>
  );
}
