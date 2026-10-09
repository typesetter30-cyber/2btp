"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { ConsultButton, useConsult } from "@/components/site/Consult";
import { company, services } from "@/lib/site";

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function Header() {
  const pathname = normalize(usePathname() || "/");
  const { openConsult } = useConsult();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Esc закрывает выпадающее меню «Услуги»
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const first = menu?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [menuButtonRef.current, ...Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter(
        (item): item is HTMLElement => item !== null && !item.hasAttribute("disabled"),
      );
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    document.body.classList.add("menu-open");
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header sticky top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap header-inner">
        <Logo />
        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Основное меню">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false);
            }}
          >
            <button
              type="button"
              className="nav-link min-h-11"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((value) => !value)}
              onFocus={() => setServicesOpen(true)}
            >
              Услуги
            </button>
            <div className={`nav-drop absolute top-full left-0 z-20 w-80 pt-3 ${servicesOpen ? "is-open" : ""}`}>
              <ul className="nav-panel overflow-hidden py-1">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="block min-h-11 px-3 py-2.5 hover:bg-paper">
                      <span className="block text-[0.9375rem]">{service.title}</span>
                      <span className="caption mt-0.5 block">{service.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/payment/" className="nav-link min-h-11 inline-flex items-center" aria-current={pathname.startsWith("/payment") ? "page" : undefined}>
            Оплата
          </Link>
          <Link href="/contacts/" className="nav-link min-h-11 inline-flex items-center" aria-current={pathname === "/contacts" ? "page" : undefined}>
            Контакты
          </Link>
          <a href={company.phoneHref} className="nav-link min-h-11 inline-flex items-center">
            {company.phoneDisplay}
          </a>
          <ConsultButton className="magnetic min-h-11 px-5 text-[0.9375rem]">Консультация</ConsultButton>
        </nav>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={company.phoneHref}
            className="btn btn-line header-icon-btn"
            aria-label={`Позвонить ${company.phoneDisplay}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span className="hidden min-[430px]:inline">Звонок</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-line header-icon-btn"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            <span className="hidden min-[430px]:inline">{menuOpen ? "Закрыть" : "Меню"}</span>
          </button>
        </div>
      </div>
      {mounted &&
        menuOpen &&
        createPortal(
        <div
          ref={menuRef}
          id={menuId}
          className="mobile-menu lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню сайта"
        >
          <p className="caption">Услуги</p>
          <ul className="mobile-nav-list mt-2">
            {services.map((service) => (
              <li key={service.href}>
                <Link href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mobile-nav-meta">
            <Link href="/payment/">Оплата услуг</Link>
            <Link href="/contacts/">Контакты</Link>
            <a href={company.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={company.phoneHref}>{company.phoneDisplay}</a>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-5 w-full min-h-11"
            onClick={() => {
              setMenuOpen(false);
              openConsult();
            }}
          >
            Получить консультацию
          </button>
        </div>,
        document.body,
      )}
    </header>
  );
}
