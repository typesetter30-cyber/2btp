import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { ConsultButton } from "@/components/site/Consult";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/home/Reveal";
import { absoluteUrl, company } from "@/lib/site";

export function ServiceShell({
  crumbs,
  eyebrow,
  title,
  lead,
  description,
  path,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description,
          url: absoluteUrl(path),
          areaServed: ["Новосибирск", "Новосибирская область", "Россия"],
          provider: {
            "@type": "Organization",
            name: company.legalName,
            url: absoluteUrl("/"),
            telephone: "+7-383-210-55-54",
          },
        }}
      />
      <Breadcrumbs items={crumbs} />
      <article className="pb-8 lg:pb-16">
        <header className="wrap pt-6 md:pt-12">
          <Reveal>
            {eyebrow ? <p className="caption">{eyebrow}</p> : null}
            <h1 className="h1 mt-2">{title}</h1>
            <p className="lead mt-4">{lead}</p>
            <div className="cta-row mt-6">
              <ConsultButton topic={title}>Получить консультацию</ConsultButton>
              <a href={company.phoneHref} className="link inline-flex min-h-11 items-center">
                {company.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </header>
        <div className="wrap">
          <Reveal delay={90}>{children}</Reveal>
        </div>
      </article>
    </>
  );
}
