import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { company, services } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-xs small text-night-muted">
            {company.legalName}. Бухгалтерия, ипотека, страхование, платежи, оценка и юридические услуги.
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="caption text-night-muted">Услуги</p>
          <ul className="mt-4 grid gap-1 small">
            {services.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="footer-link">
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/payment/" className="footer-link">
                Оплата услуг
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="caption text-night-muted">Контакты</p>
          <ul className="mt-4 grid gap-1 small leading-relaxed">
            <li>
              <a href={company.phoneHref} className="footer-link">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="footer-link">
                {company.email}
              </a>
            </li>
            <li className="px-0 py-2">{company.hours}</li>
            <li className="px-0 py-2">{company.footerAddress}</li>
            <li className="px-0 py-2 text-night-muted">Юридический адрес: {company.legalAddress}</li>
            <li>
              <a href={company.telegram} className="footer-link" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-line">
        <div className="wrap flex flex-col gap-3 py-5 caption text-night-muted md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning>
            © {year}{" "}
            <a href="https://2btp.ru">
              2btp.ru
            </a>
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/politika-konfidencialnosti/" className="footer-link">
              Политика конфиденциальности
            </Link>
            <Link href="/obrabotka-personalnyh-dannyh/" className="footer-link">
              Согласие на обработку персональных данных
            </Link>
            <Link href="/contacts/" className="footer-link">
              Контакты
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
