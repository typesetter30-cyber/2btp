import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Calculator,
  FileStack,
  Home,
  KeyRound,
  Landmark,
  type LucideIcon,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { ConsultButton } from "@/components/site/Consult";
import { Reviews } from "@/components/home/Reviews";
import { Tilt } from "@/components/home/Tilt";
import { company, companyPartners, insurers, services } from "@/lib/site";

function Mark({ logo }: { name: string; logo?: string }) {
  if (!logo) return null;
  if (logo.endsWith(".svg")) return <img src={logo} alt="" width={140} height={40} loading="lazy" />;
  return <Image src={logo} alt="" width={140} height={40} />;
}

function IconDisc({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-disc">
      <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

const businessItems: Array<{ icon: LucideIcon; text: string }> = [
  { icon: Building2, text: "Регистрация ИП и ООО" },
  { icon: Landmark, text: "Подбор расчётного счёта" },
  { icon: Smartphone, text: "Рекомендации по оборудованию" },
  { icon: FileStack, text: "Документооборот с поставщиками и заказчиками" },
  { icon: Calculator, text: "Бухгалтерия, налоги и требования ИФНС" },
  { icon: Wallet, text: "Приём платежей в пользу юридических лиц" },
  { icon: Shield, text: "Страхование имущества, ответственности и стройки" },
  { icon: Scale, text: "Юридическое сопровождение, в том числе для агентств" },
  { icon: Building2, text: "Оценка коммерческой недвижимости, техники и бизнеса" },
];

const personalItems: Array<{ icon: LucideIcon; text: string }> = [
  { icon: Home, text: "Ипотека и рефинансирование" },
  { icon: Search, text: "Кредитная история и рейтинг" },
  { icon: ShieldCheck, text: "Полисы: жильё, авто, ДМС, жизнь, поездки" },
  { icon: FileStack, text: "Оценка жилья, земли и гаражей" },
  { icon: KeyRound, text: "Перепланировка, приватизация, материнский капитал" },
  { icon: Scale, text: "Споры о недвижимости, наследстве и семье" },
];

const facts: Array<{ title: string; text: string }> = [
  { title: "Реестр Банка России", text: `Платёжный агент. ${company.cbDecision}.` },
  { title: "Яндекс Карты", text: "Отметка «Хорошее место 2026»." },
  { title: "С 2009 года", text: "Год начала работы, указанный компанией." },
  { title: "Реквизиты", text: `ИНН ${company.inn}, ОГРН ${company.ogrn}.` },
  { title: "Страхование", text: "Агентские договоры со страховыми компаниями." },
  { title: "Партнёры", text: "Жилфонд, Альфа-Банк, Сбербанк, Шумкин и партнеры, ВТБ24, ПромСвязьБанк." },
];

const steps: Array<{ title: string; text: string }> = [
  { title: "Заявка", text: "Пишете на сайте, звоните или открываете Telegram." },
  { title: "Уточнение", text: "Специалист выясняет, какая услуга нужна." },
  { title: "Состав работ", text: "Согласуем задачу и документы." },
  { title: "Сопровождение", text: "Ведём учёт, полис, оценку, платёж или юридический вопрос." },
];

function InsurerList() {
  return (
    <ul className="partner-grid mt-3">
      {insurers.map((partner) => (
        <li key={partner.name} className="partner-cell">
          <a href={partner.href} target="_blank" rel="noreferrer">
            <Mark name={partner.name} logo={partner.logo} />
            <span className="caption text-center">{partner.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HomePage() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-grid">
          <div className="hero-copy rise">
            <h1 className="display">Бухгалтерия, ипотека, страхование и право</h1>
            <p className="lead mt-5">
              Одна компания для учёта, полисов, ипотеки, приёма платежей, оценки и юридических вопросов — бизнесу и частным клиентам.
            </p>
            <div className="cta-row mt-7">
              <ConsultButton>Получить консультацию</ConsultButton>
              <a href={company.phoneHref} className="link inline-flex min-h-11 items-center">
                {company.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="hero-photo rise rise-late">
            <Image
              src="/photos/hero.jpg"
              alt="Иллюстрация: консультация специалиста с клиентом"
              fill
              preload
              sizes="(min-width: 900px) 42vw, 100vw"
            />
          </div>
        </div>
        <p className="hero-facts glass-refract sheen rise rise-late">
          <span>Новосибирск · {company.legalName}</span>
          <a href={company.yandexMaps} target="_blank" rel="noreferrer" className="hero-award link">
            <Image src="/brand/ya-good-place.png" alt="" width={28} height={38} className="h-9 w-auto" />
            Хорошее место 2026
          </a>
          <span>
            <Landmark size={16} aria-hidden="true" />
            Платёжный агент Банка России. {company.cbDecision}.
          </span>
        </p>
      </section>

      <section className="section appear" aria-labelledby="services-title">
        <div className="wrap">
          <h2 id="services-title" className="h2 section-head">
            Услуги
          </h2>
          <ul className="svc-index">
            {services.map((service) => (
              <li key={service.href} className="svc-row">
                <Tilt>
                  <Link href={service.href} className="svc-card">
                    <span className="svc-name">{service.title}</span>
                    <span className="svc-note">{service.summary}</span>
                  </Link>
                </Tilt>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section appear" aria-labelledby="audience-title">
        <div className="wrap">
          <h2 id="audience-title" className="h2 section-head">
            Кому помогаем
          </h2>
          <div className="audience">
            <div className="glass-dark audience-card">
              <p className="caption">Для компаний</p>
              <h3 className="h3 mt-2">Бизнесу</h3>
              <ul className="task-list">
                {businessItems.map((item) => (
                  <li key={item.text}>
                    <IconDisc icon={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass audience-card">
              <p className="caption">Для людей</p>
              <h3 className="h3 mt-2">Частным клиентам</h3>
              <ul className="task-list">
                {personalItems.map((item) => (
                  <li key={item.text}>
                    <IconDisc icon={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section appear" aria-labelledby="pay-title">
        <div className="wrap">
          <div className="band-ink sheen pay-band">
            <div className="pay-grid">
              <div>
                <h2 id="pay-title" className="h2">
                  Приём платежей для бизнеса
                </h2>
                <p className="lead mt-5">
                  Полный цикл в пользу юридических лиц: от приёма средств до отправки получателю, с документами и чеками.
                </p>
              </div>
              <div className="pay-card">
                <p className="caption">Решение Банка России</p>
                <p className="pay-number mt-2">13.08.2024 № 14-51/5297</p>
                <p className="small mt-4 max-w-sm text-night-muted">
                  Это услуга для ваших клиентов. Оплата работ самой компании — отдельно.
                </p>
                <div className="cta-row mt-6">
                  <Link href="/operator-po-priemu-platezhey/" className="btn btn-primary">
                    Условия для бизнеса
                  </Link>
                  <Link href="/payment/" className="link inline-flex min-h-11 items-center">
                    Оплатить услугу компании
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section appear" aria-labelledby="trust-title">
        <div className="wrap">
          <h2 id="trust-title" className="h2 section-head">
            Что можно проверить
          </h2>
          <dl className="fact-grid">
            {facts.map((fact) => (
              <Tilt key={fact.title} className="glass fact-card">
                <dt>{fact.title}</dt>
                <dd className="small mt-1 text-muted">{fact.text}</dd>
              </Tilt>
            ))}
          </dl>
          <p className="mt-6">
            <a href={company.yandexMaps} className="link" target="_blank" rel="noreferrer">
              Карточка на Яндекс Картах
            </a>
          </p>
        </div>
      </section>

      <section className="section appear" aria-labelledby="partners-title">
        <div className="wrap">
          <h2 id="partners-title" className="h2 section-head">
            Партнёры
          </h2>
          <ul className="partner-grid">
            {companyPartners.map((partner) => (
              <li key={partner.name} className="partner-cell">
                <Mark name={partner.name} logo={partner.logo} />
                <span className={partner.logo ? "caption text-center" : "partner-word"}>{partner.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <div className="hidden md:block">
              <h3 className="h3">Страховые компании</h3>
              <InsurerList />
            </div>
            <details className="insurers-fold md:hidden">
              <summary>Страховые компании</summary>
              <InsurerList />
            </details>
          </div>
        </div>
      </section>

      <section className="section appear" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title" className="h2 section-head">
            Как проходит обращение
          </h2>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title} className="glass">
                <span className="step-num">Шаг {index + 1}</span>
                <h3 className="h3 mt-3">{step.title}</h3>
                <p className="small mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section appear">
        <div className="wrap">
          <Reviews />
        </div>
      </section>

      <section className="section wrap appear" aria-labelledby="self-title">
        <div className="glass sheen self-band">
          <div className="self-photo">
            <Image
              src="/photos/self-employed.jpg"
              alt="Иллюстрация: человек оформляет самозанятость с телефона"
              fill
              sizes="(min-width: 860px) 42vw, 100vw"
            />
          </div>
          <div className="self-copy">
            <p className="caption">Реклама · СберБанк Онлайн</p>
            <h2 id="self-title" className="h2 mt-2">
              Стать самозанятым
            </h2>
            <p className="lead mt-3">Без посещения ФНС и офиса банка, в приложении СберБанк Онлайн.</p>
            <a href={company.selfEmployedHref} className="btn btn-primary mt-6" target="_blank" rel="noreferrer">
              Зарегистрироваться
            </a>
            <p className="caption mt-3 break-all">erid: {company.selfEmployedErid}</p>
          </div>
        </div>
      </section>

      <section className="section wrap appear" aria-labelledby="cta-title">
        <div className="band-ink sheen close-band">
          <div className="close-grid">
            <h2 id="cta-title" className="display">
              Расскажите, какая задача стоит
            </h2>
            <div>
              <p className="small text-night-muted">
                {company.hours}. {company.weekend}.
              </p>
              <div className="cta-row mt-5">
                <ConsultButton variant="light">Получить консультацию</ConsultButton>
                <a href={company.telegram} className="link inline-flex min-h-11 items-center" target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
