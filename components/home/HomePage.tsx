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
import { Aurora } from "@/components/fx/Aurora";
import { Counter } from "@/components/fx/Counter";
import { GlassPlate } from "@/components/fx/GlassPlate";
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
      {insurers.map((partner, index) => (
        <li key={partner.name} className="partner-cell" data-reveal style={{ "--i": index % 6 } as React.CSSProperties}>
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
      {/* 1. Первый экран: aurora, свечение за курсором, параллакс фото */}
      <section className="hero band band-light" data-glow>
        <Aurora />
        <div className="cursor-glow" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <h1 className="display" data-reveal data-split>
                Бухгалтерия, ипотека, страхование и право
              </h1>
              <p className="lead mt-5" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Одна компания для учёта, полисов, ипотеки, приёма платежей, оценки и юридических вопросов — бизнесу и частным клиентам.
              </p>
              <div className="cta-row mt-7" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
                <ConsultButton className="magnetic">Получить консультацию</ConsultButton>
                <a href={company.phoneHref} className="link inline-flex min-h-11 items-center">
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
            <div
              className="hero-photo"
              data-reveal="scale"
              data-parallax
              style={{ "--parallax": 4 } as React.CSSProperties}
            >
              <Image
                src="/photos/hero.jpg"
                alt="Иллюстрация: консультация специалиста с клиентом"
                fill
                preload
                sizes="(min-width: 900px) 42vw, 100vw"
              />
            </div>
          </div>
          <p className="hero-facts" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
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
        </div>
      </section>

      {/* 2. Стеклянная плашка с логотипом, вращается при прокрутке */}
      <GlassPlate />

      {/* 3. Услуги */}
      <section className="section band band-light" aria-labelledby="services-title">
        <div className="wrap">
          <h2 id="services-title" className="h2 section-head" data-reveal data-split>
            Услуги
          </h2>
          <ul className="svc-grid">
            {services.map((service, index) => (
              <li key={service.href} data-reveal style={{ "--i": index % 3 } as React.CSSProperties}>
                <Link href={service.href} className="card svc-card">
                  <span className="svc-name">{service.title}</span>
                  <span className="svc-note">{service.summary}</span>
                  <span className="svc-more">Подробнее</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Кому помогаем */}
      <section className="section band band-soft" aria-labelledby="audience-title">
        <div className="wrap">
          <h2 id="audience-title" className="h2 section-head" data-reveal data-split>
            Кому помогаем
          </h2>
          <div className="audience">
            <div className="card" data-reveal="left">
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
            <div className="card" data-reveal="right">
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

      {/* 5. Приём платежей — тёмная полоса */}
      <section className="section band band-deep" aria-labelledby="pay-title">
        <Aurora blobs={3} />
        <div className="wrap">
          <div className="pay-grid">
            <div>
              <h2 id="pay-title" className="h2" data-reveal data-split>
                Приём платежей для бизнеса
              </h2>
              <p className="lead mt-5" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Полный цикл в пользу юридических лиц: от приёма средств до отправки получателю, с документами и чеками.
              </p>
            </div>
            <div className="card" data-reveal="right">
              <p className="caption">Решение Банка России</p>
              <p className="pay-number mt-2">13.08.2024 № 14-51/5297</p>
              <p className="small mt-4 max-w-sm">
                Это услуга для ваших клиентов. Оплата работ самой компании — отдельно.
              </p>
              <div className="cta-row mt-6">
                <Link href="/operator-po-priemu-platezhey/" className="btn btn-primary magnetic">
                  Условия для бизнеса
                </Link>
                <Link href="/payment/" className="link inline-flex min-h-11 items-center">
                  Оплатить услугу компании
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Что можно проверить + счётчики */}
      <section className="section band band-light dotted" aria-labelledby="trust-title">
        <div className="wrap">
          <h2 id="trust-title" className="h2 section-head" data-reveal data-split>
            Что можно проверить
          </h2>
          <dl className="fact-grid">
            {facts.map((fact, index) => (
              <div
                key={fact.title}
                className="card fact-card"
                data-reveal
                style={{ "--i": index % 3 } as React.CSSProperties}
              >
                <dt>{fact.title}</dt>
                <dd className="small text-muted">{fact.text}</dd>
              </div>
            ))}
          </dl>
          <div className="stat-row" data-reveal>
            <span className="stat">
              <span className="stat-value">
                <Counter value={2009} from={1995} />
              </span>
              <span className="stat-label">год начала работы, указанный компанией</span>
            </span>
            <span className="stat">
              <span className="stat-value">
                <Counter value={insurers.length} />
              </span>
              <span className="stat-label">страховых компаний с агентскими договорами</span>
            </span>
            <span className="stat">
              <span className="stat-value">
                <Counter value={companyPartners.length} />
              </span>
              <span className="stat-label">партнёров в списке на сайте</span>
            </span>
          </div>
          <p className="mt-6" data-reveal>
            <a href={company.yandexMaps} className="link" target="_blank" rel="noreferrer">
              Карточка на Яндекс Картах
            </a>
          </p>
        </div>
      </section>

      {/* 7. Как проходит обращение */}
      <section className="section band band-soft" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title" className="h2 section-head" data-reveal data-split>
            Как проходит обращение
          </h2>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title} className="card" data-reveal style={{ "--i": index } as React.CSSProperties}>
                <span className="step-num">{index + 1}</span>
                <h3 className="h3 mt-3">{step.title}</h3>
                <p className="small mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Отзывы */}
      <section className="section band band-light">
        <div className="wrap" data-reveal>
          <Reviews />
        </div>
      </section>

      {/* 9. Партнёры */}
      <section className="section band band-soft" aria-labelledby="partners-title">
        <div className="wrap">
          <h2 id="partners-title" className="h2 section-head" data-reveal data-split>
            Партнёры
          </h2>
          <ul className="partner-grid">
            {companyPartners.map((partner, index) => (
              <li
                key={partner.name}
                className="partner-cell"
                data-reveal
                style={{ "--i": index % 6 } as React.CSSProperties}
              >
                <Mark name={partner.name} logo={partner.logo} />
                <span className={partner.logo ? "caption text-center" : "partner-word"}>{partner.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <div className="hidden md:block">
              <h3 className="h3" data-reveal>
                Страховые компании
              </h3>
              <InsurerList />
            </div>
            <details className="insurers-fold md:hidden">
              <summary>Страховые компании</summary>
              <InsurerList />
            </details>
          </div>
        </div>
      </section>

      {/* 10. Самозанятость */}
      <section className="section band band-light" aria-labelledby="self-title">
        <div className="wrap">
          <div className="card self-band" data-reveal="scale">
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
              <a
                href={company.selfEmployedHref}
                className="btn btn-primary magnetic mt-6"
                target="_blank"
                rel="noreferrer"
              >
                Зарегистрироваться
              </a>
              <p className="caption mt-3 break-all">erid: {company.selfEmployedErid}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Финальный блок — тёмная полоса */}
      <section className="section band band-deep" aria-labelledby="cta-title" data-glow>
        <Aurora blobs={3} />
        <div className="cursor-glow" aria-hidden="true" />
        <div className="wrap close-grid">
          <h2 id="cta-title" className="display" data-reveal data-split>
            Расскажите, какая задача стоит
          </h2>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <p className="small">
              {company.hours}. {company.weekend}.
            </p>
            <div className="cta-row mt-5">
              <ConsultButton variant="light" className="magnetic">
                Получить консультацию
              </ConsultButton>
              <a href={company.telegram} className="link inline-flex min-h-11 items-center" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
