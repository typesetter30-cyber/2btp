import Link from "next/link";
import { services } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="wrap py-16">
      <p className="caption">404</p>
      <h1 className="h1 mt-2">Страница не найдена</h1>
      <p className="lead mt-4">Такого адреса на сайте нет. Вернитесь на главную или откройте нужную услугу.</p>
      <Link href="/" className="btn btn-primary mt-8">
        На главную
      </Link>
      <ul className="mt-10 grid gap-2 text-sm sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.href}>
            <Link href={service.href} className="hover:text-brand-dark">
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
