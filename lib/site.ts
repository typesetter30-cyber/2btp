export const SITE_URL = "https://2btp.ru";

export const company = {
  name: "Технологии Бизнеса",
  legalName: "ООО «Технологии Бизнеса»",
  legalNameUpper: "ООО «ТЕХНОЛОГИИ БИЗНЕСА»",
  inn: "5406524357",
  ogrn: "1095406007201",
  legalAddress: "630099, г. Новосибирск, ул. Каменская, д. 58",
  footerAddress: "г. Новосибирск, ул. Фрунзе, 18/1",
  phoneDisplay: "+7 (383) 210-55-54",
  phoneHref: "tel:+73832105554",
  email: "911@2btp.ru",
  emailHref: "mailto:911@2btp.ru",
  hours: "пн–пт, 08:00–18:00",
  weekend: "суббота и воскресенье — выходные",
  telegram: "https://t.me/tehnology_of_buisness",
  paymentsTelegram: "https://t.me/Elena_M2021",
  vk: "https://vk.com/technologi_of_business",
  ok: "https://ok.ru/group/70000000264293",
  yandexMaps: "https://yandex.com/maps/-/CPgcQLmQ",
  twoGis: "https://go.2gis.com/ta7mz",
  mapEmbed:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A0231436cfd33c25089e506082475aed343a059336ec654188fa279f1df2a4528&source=constructor",
  startYear: 2009,
  cbDecision: "решение ЦБ РФ от 13.08.2024 № 14-51/5297",
  selfEmployedHref:
    "https://partners.dasreda.ru/landing/self-employed?partnerID=f7e12861838d7ade7c98&erid=2sHEdXsRPzfProskJ98KnEuJA9WiwbKRygVGPMuVjusinybP7yaAy8Lj",
  selfEmployedErid: "2sHEdXsRPzfProskJ98KnEuJA9WiwbKRygVGPMuVjusinybP7yaAy8Lj",
  standardPdf: "/docs/basic_standart_ssd.pdf",
  osgopHref:
    "https://www.ingos.ru/corporate/liability/taxi?utm_source=novosibirsk&utm_medium=jilfond&utm_campaign=referral#calc",
} as const;

export type ServiceLink = {
  href: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
};

export const services: ServiceLink[] = [
  {
    href: "/buhgalterskie-uslugi/",
    label: "Бухгалтерия",
    title: "Бухгалтерские услуги",
    summary: "Учёт, отчётность, налоги и кадры.",
    points: [
      "Бухгалтерское обслуживание",
      "Составление и сдача отчётности",
      "Консультации по налогам",
      "Восстановление учёта",
      "Разработка учётной политики",
      "Кадровый учёт",
    ],
  },
  {
    href: "/ipotechnyj-broker/",
    label: "Ипотека",
    title: "Ипотечный брокер",
    summary: "Программа, рефинансирование и кредитная история.",
    points: [
      "Подбор ипотечной программы",
      "Рефинансирование",
      "Анализ кредитной истории",
      "Рекомендации по улучшению кредитного рейтинга",
    ],
  },
  {
    href: "/strahovanie/",
    label: "Страхование",
    title: "Страховые услуги",
    summary: "Подбор полиса, сопровождение убытка и расторжение.",
    points: [
      "Агентские договоры со страховыми компаниями",
      "Подбор программ, условия и тарифы",
      "Ипотека, имущество, авто, жизнь и ДМС",
      "Консультации по убыткам и расторжению полисов",
    ],
  },
  {
    href: "/operator-po-priemu-platezhey/",
    label: "Платежи",
    title: "Приём платежей",
    summary: "Платежный агент из реестра Банка России.",
    points: [
      "Приём платежей в пользу юридических лиц",
      "Обработка и отправка средств получателю",
      "Документы и чеки",
    ],
  },
  {
    href: "/ocenka-nedvizhimosti/",
    label: "Оценка",
    title: "Оценка и документы",
    summary: "Оценка объектов и оформление имущественных документов.",
    points: [
      "Оценка недвижимости",
      "Согласование перепланировки",
      "Приватизация квартир и комнат",
      "Оформление комнат в отдельные объекты",
      "Право собственности на участки, дома и дачи",
      "Соглашения по материнскому капиталу",
    ],
  },
  {
    href: "/yuridicheskie-uslugi/",
    label: "Право",
    title: "Юридические услуги",
    summary: "Консультации, претензии, суд и договоры.",
    points: [
      "Недвижимость, наследование, семейные споры",
      "Защита прав потребителей",
      "Представление интересов в суде",
      "Споры с другими собственниками",
    ],
  },
];

export const directions = [
  { index: "01", title: "Бухгалтерия", text: "Учёт, отчётность, налоги, кадры", href: "/buhgalterskie-uslugi/" },
  { index: "02", title: "Ипотека", text: "Программа и рефинансирование", href: "/ipotechnyj-broker/" },
  { index: "03", title: "Страхование", text: "Полис, убыток, расторжение", href: "/strahovanie/" },
  { index: "04", title: "Платежи", text: "Реестр Банка России", href: "/operator-po-priemu-platezhey/" },
  { index: "05", title: "Оценка", text: "Объекты и документы", href: "/ocenka-nedvizhimosti/" },
  { index: "06", title: "Право", text: "Консультация и суд", href: "/yuridicheskie-uslugi/" },
] as const;

export const businessTasks = [
  "Регистрация ИП и ООО",
  "Подбор расчётного счёта",
  "Рекомендации по приобретению и настройке оборудования",
  "Документооборот с поставщиками и заказчиками",
  "Бухгалтерия, налоги и разбор требований ИФНС",
  "Приём платежей в пользу юридических лиц",
  "Страхование имущества, ответственности и строительно-монтажных рисков",
  "Юридическое сопровождение, включая пакет для агентств недвижимости",
  "Оценка коммерческой недвижимости, оборудования и бизнеса",
];

export const personalTasks = [
  "Подбор ипотеки и рефинансирование",
  "Анализ кредитной истории и рекомендации по рейтингу",
  "Страхование ипотеки, квартиры, дома, КАСКО, ОСАГО, ДМС, жизни и поездок",
  "Оценка жилья, земли и гаражей для банка, нотариуса или суда",
  "Перепланировка, приватизация, собственность, материнский капитал",
  "Споры о недвижимости, наследстве, семье и правах потребителя",
];

export type LogoPartner = {
  name: string;
  note: string;
  logo?: string;
};

export const companyPartners: LogoPartner[] = [
  { name: "Жилфонд", note: "агентство недвижимости", logo: "/partners/partners-1.png" },
  { name: "Альфа-Банк", note: "Альфа-Банк" },
  { name: "Сбербанк", note: "Сбербанк", logo: "/partners/partners-3.png" },
  { name: "Шумкин и партнеры", note: "юридическая фирма", logo: "/partners/partners-4.png" },
  { name: "ВТБ24", note: "ВТБ24", logo: "/partners/partners-5.png" },
  { name: "ПромСвязьБанк", note: "ПромСвязьБанк", logo: "/partners/partners-6.png" },
];

export const insurers: Array<LogoPartner & { href: string }> = [
  { name: "СОГАЗ", note: "СОГАЗ", href: "https://sogaz.ru/", logo: "/insurance/s-partners-1.png" },
  { name: "Ингосстрах", note: "Ингосстрах", href: "https://www.ingos.ru/", logo: "/insurance/s-partners-2.png" },
  { name: "Ингосстрах-Жизнь", note: "Ингосстрах-Жизнь", href: "https://lifeingos.ru/", logo: "/insurance/s-partners-3.png" },
  { name: "РЕСО-Гарантия", note: "РЕСО-Гарантия", href: "https://reso.ru/", logo: "/insurance/s-partners-4.png" },
  { name: "Росгосстрах", note: "Росгосстрах", href: "https://www.rgs.ru/", logo: "/insurance/s-partners-5.png" },
  { name: "АльфаСтрахование", note: "АльфаСтрахование", href: "https://www.alfastrah.ru/", logo: "/insurance/s-partners-6.png" },
  { name: "ВСК", note: "ВСК", href: "https://www.vsk.ru/", logo: "/insurance/s-partners-7.png" },
  { name: "ЭНЕРГОГАРАНТ", note: "ЭНЕРГОГАРАНТ", href: "https://energogarant.ru/", logo: "/insurance/s-partners-8.png" },
  { name: "Абсолют Страхование", note: "Абсолют Страхование", href: "https://www.absolutins.ru/", logo: "/insurance/s-partners-9.png" },
  { name: "Зетта Страхование", note: "Зетта Страхование", href: "https://zettains.ru/", logo: "/insurance/s-partners-10.png" },
  { name: "Югория", note: "Югория", href: "https://new.ugsk.ru/", logo: "/insurance/s-partners-11.png" },
  { name: "ПАРИ", note: "ПАРИ", href: "https://skpari.ru/", logo: "/insurance/s-partners-12.png" },
  { name: "Астро-Волга", note: "Астро-Волга", href: "https://astrovolga.ru/", logo: "/insurance/s-partners-13.png" },
  { name: "Совкомбанк Страхование", note: "Совкомбанк Страхование", href: "https://sovcomins.ru/", logo: "/insurance/sovcom-strahovanie.svg" },
  { name: "ПСБ Страхование", note: "ПСБ Страхование", href: "https://psbins.ru/", logo: "/insurance/psb-strahovanie.svg" },
  { name: "СберСтрахование", note: "СберСтрахование", href: "https://sberbankins.ru/", logo: "/insurance/sber-strahovanie.svg" },
];

export const publicRoutes = [
  "/",
  "/buhgalterskie-uslugi/",
  "/ipotechnyj-broker/",
  "/strahovanie/",
  "/strahovanie/ipoteka-strahovanie-online/",
  "/strahovanie/osago-online/",
  "/strahovanie/strahovanie-kvartiry-online/",
  "/strahovanie/strakhovanie-puteshestvennikov/",
  "/operator-po-priemu-platezhey/",
  "/ocenka-nedvizhimosti/",
  "/yuridicheskie-uslugi/",
  "/payment/",
  "/contacts/",
  "/politika-konfidencialnosti/",
  "/obrabotka-personalnyh-dannyh/",
];

export function absoluteUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return `${SITE_URL}${normalized}`;
}
