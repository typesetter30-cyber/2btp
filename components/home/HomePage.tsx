import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Calculator,
  Calendar,
  FileStack,
  Home,
  KeyRound,
  Landmark,
  type LucideIcon,
  Phone,
  Receipt,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { ConsultButton } from "@/components/site/Consult";
import { Reveal } from "@/components/home/Reveal";
import { Reviews } from "@/components/home/Reviews";
import { company, companyPartners, insurers } from "@/lib/site";

function Mark({ logo }: { name: string; logo?: string }) {
  if (!logo) return null;
  if (logo.endsWith(".svg")) return <img src={logo} alt="" width={140} height={40} />;
  return <Image src={logo} alt="" width={140} height={40} />;
}

function IconDisc({ icon: Icon, dark = false }: { icon: LucideIcon; dark?: boolean }) {
  return (
    <span className={dark ? "icon-disc icon-disc-dark" : "icon-disc"}>
      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
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

const facts: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Landmark, title: "Реестр Банка России", text: `Платёжный агент. ${company.cbDecision}.` },
  { icon: Star, title: "Яндекс Карты", text: "Отметка «Хорошее место 2026»." },
  { icon: Calendar, title: "С 2009 года", text: "Год начала работы, указанный компанией." },
  { icon: BadgeCheck, title: "Реквизиты", text: `ИНН ${company.inn}, ОГРН ${company.ogrn}.` },
  { icon: Shield, title: "Страхование", text: "Агентские договоры со страховыми компаниями." },
  { icon: Users, title: "Партнёры", text: "Жилфонд, Альфа-Банк, Сбербанк, Шумкин и партнеры, ВТБ24, ПромСвязьБанк." },
];

const steps: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Phone, title: "Заявка", text: "Пишете на сайте, звоните или открываете Telegram." },
  { icon: Search, title: "Уточнение", text: "Специалист выясняет, какая услуга нужна." },
  { icon: FileStack, title: "Состав работ", text: "Согласуем задачу и документы." },
  { icon: BadgeCheck, title: "Сопровождение", text: "Ведём учёт, полис, оценку, платёж или юридический вопрос." },
];

function InsurerList() {
  return (
    <ul className="partner-grid">
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
      <section className="hero section wrap">
        <div className="hero-grid">
          <div className="hero-copy rise">
            <p className="caption">Новосибирск · {company.legalName}</p>
            <h1 className="display mt-3">Бухгалтерия, ипотека, страхование и право</h1>
            <p className="lead mt-5">
              Одна компания для учёта, полисов, ипотеки, приёма платежей, оценки и юридических вопросов — бизнесу и частным клиентам.
            </p>
            <div className="hero-actions cta-row">
              <ConsultButton>Получить консультацию</ConsultButton>
              <a href={company.phoneHref} className="link inline-flex min-h-11 items-center">
                {company.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <Image
              src="/photos/hero.jpg"
              alt="Иллюстрация: консультация специалиста с клиентом"
              fill
              priority
              sizes="(min-width: 960px) 42vw, 100vw"
            />
          </div>
          <p className="hero-meta rise rise-late">
            <a href={company.yandexMaps} target="_blank" rel="noreferrer" className="hero-award link">
              <Image src="/brand/ya-good-place.png" alt="" width={28} height={38} className="h-8 w-auto" />
              Хорошее место 2026
            </a>
            <span className="inline-flex items-center gap-2">
              <Landmark size={16} aria-hidden="true" />
              Платёжный агент Банка России. {company.cbDecision}.
            </span>
          </p>
        </div>
      </section>

      <section className="section band-sand" aria-labelledby="audience-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="audience-title" className="h2">Кому помогаем</h2>
          </Reveal>
          <div className="audience-stage">
            <Reveal className="audience-business">
              <p className="caption text-night-muted">Для компаний</p>
              <h3 className="mt-2 font-serif text-[1.45rem] leading-tight text-paper md:text-3xl">Бизнесу</h3>
              <ul className="icon-rows">
                {businessItems.map((item) => (
                  <li key={item.text}>
                    <IconDisc icon={item.icon} dark />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="audience-people" delay={120}>
              <p className="caption">Для людей</p>
              <h3 className="h3 mt-2">Частным клиентам</h3>
              <ul className="icon-mosaic">
                {personalItems.map((item) => (
                  <li key={item.text}>
                    <IconDisc icon={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band-ink" aria-labelledby="pay-title">
        <div className="wrap pay-grid">
          <Reveal>
            <span className="icon-disc">
              <Receipt size={18} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 id="pay-title" className="h2 mt-4">
              Приём платежей для бизнеса
            </h2>
            <p className="lead mt-4">
              Полный цикл в пользу юридических лиц: от приёма средств до отправки получателю, с документами и чеками.
            </p>
          </Reveal>
          <Reveal className="pay-card" delay={120}>
            <p className="caption">Решение Банка России</p>
            <p className="h3 mt-2">13.08.2024 № 14-51/5297</p>
            <p className="small mt-3 max-w-sm">Это услуга для ваших клиентов. Оплата работ самой компании — отдельно.</p>
            <div className="cta-row mt-5">
              <Link href="/operator-po-priemu-platezhey/" className="btn btn-primary">
                Условия для бизнеса
              </Link>
              <Link href="/payment/" className="link inline-flex min-h-11 items-center">
                Оплатить услугу компании
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-dots" aria-labelledby="trust-title">
        <Reveal>
        <div className="wrap">
          <h2 id="trust-title" className="h2 section-head">Что можно проверить</h2>
          <dl className="fact-icons">
            {facts.map((fact) => (
              <div key={fact.title} className="glass fact-icon">
                <IconDisc icon={fact.icon} />
                <dt>{fact.title}</dt>
                <dd className="small text-muted">{fact.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4">
            <a href={company.yandexMaps} className="link" target="_blank" rel="noreferrer">
              Карточка на Яндекс Картах
            </a>
          </p>
        </div>
        </Reveal>
      </section>

      <section className="section band-mist" aria-labelledby="partners-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="partners-title" className="h2">Партнёры</h2>
          </Reveal>
          <Reveal>
            <ul className="partner-grid">
              {companyPartners.map((partner) => (
                <li key={partner.name} className="partner-cell">
                  <Mark name={partner.name} logo={partner.logo} />
                  <span className={partner.logo ? "caption text-center" : "partner-word"}>{partner.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-8 md:mt-10" delay={80}>
            <div className="hidden md:block">
              <h3 className="h3 section-head">Страховые компании</h3>
              <InsurerList />
            </div>
            <details className="insurers-fold md:hidden">
              <summary className="insurers-summary">Страховые компании</summary>
              <div className="mt-4">
                <InsurerList />
              </div>
            </details>
          </Reveal>
        </div>
      </section>

      <section className="section band-clay" aria-labelledby="process-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="process-title" className="h2">Как проходит обращение</h2>
          </Reveal>
          <ol className="steps">
            {steps.map((step, index) => (
              <Reveal key={step.title} as="li" className="glass" delay={index * 90}>
                <IconDisc icon={step.icon} />
                <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-3">{step.title}</h3>
                <p className="small mt-2 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-sand">
        <Reveal>
        <div className="wrap">
          <Reviews />
        </div>
        </Reveal>
      </section>

      <section className="section wrap" aria-labelledby="self-title">
        <Reveal>
        <div className="self-band">
          <div className="self-photo">
            <Image
              src="/photos/self-employed.jpg"
              alt="Иллюстрация: человек оформляет самозанятость с телефона"
              fill
              sizes="(min-width: 800px) 42vw, 100vw"
            />
          </div>
          <div className="self-copy">
            <p className="caption">Реклама · СберБанк Онлайн</p>
            <h2 id="self-title" className="h2 mt-2">Стать самозанятым</h2>
            <p className="lead mt-3">Без посещения ФНС и офиса банка, в приложении СберБанк Онлайн.</p>
            <a href={company.selfEmployedHref} className="btn btn-primary mt-6 min-h-11" target="_blank" rel="noreferrer">
              Зарегистрироваться
            </a>
            <p className="caption mt-3 break-all">erid: {company.selfEmployedErid}</p>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="close" aria-labelledby="cta-title">
        <Reveal>
        <div className="wrap close-grid">
          <h2 id="cta-title" className="display text-paper">
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
        </Reveal>
      </section>
    </>
  );
}
