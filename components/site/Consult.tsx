"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { company, services } from "@/lib/site";

type ConsultContextValue = {
  openConsult: (topic?: string) => void;
};

const ConsultContext = createContext<ConsultContextValue>({
  openConsult: () => undefined,
});

export function useConsult() {
  return useContext(ConsultContext);
}

export function ConsultButton({
  topic,
  children,
  className = "",
  variant = "primary",
}: {
  topic?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "light" | "ghost" | "quiet";
}) {
  const { openConsult } = useConsult();
  const styles = {
    primary: "btn btn-primary",
    light: "btn btn-light",
    ghost: "btn btn-line",
    quiet: "btn btn-quiet",
  }[variant];

  return (
    <button type="button" onClick={() => openConsult(topic)} className={`${styles} ${className}`}>
      {children}
    </button>
  );
}

export function ConsultProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");

  const openConsult = (nextTopic?: string) => {
    setTopic(nextTopic ?? "");
    setOpen(true);
  };

  return (
    <ConsultContext.Provider value={{ openConsult }}>
      {children}
      {open ? <ConsultDialog topic={topic} onClose={() => setOpen(false)} /> : null}
    </ConsultContext.Provider>
  );
}

function ConsultDialog({ topic, onClose }: { topic: string; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = panelRef.current;
    const focusable = node?.querySelector<HTMLElement>("input, textarea, button, select");
    focusable?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>("a, button, input, textarea, select")).filter(
        (item) => !item.hasAttribute("disabled"),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button type="button" aria-label="Закрыть" className="absolute inset-0 bg-night/60" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="consult-dialog relative max-h-[min(92dvh,42rem)] w-full overflow-y-auto rounded-t-3xl border border-line bg-white px-5 py-6 shadow-[0_24px_60px_rgba(20,24,31,0.18)] sm:max-w-lg sm:rounded-3xl sm:px-8 sm:py-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="caption">Консультация</p>
            <h2 id={titleId} className="h3 mt-1 text-2xl">
              Получить консультацию
            </h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-line min-h-11 min-w-11 px-0 sm:px-3" aria-label="Закрыть форму">
            <span aria-hidden="true" className="sm:hidden">×</span>
            <span className="hidden sm:inline">Закрыть</span>
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Оставьте контакты. Специалист свяжется с вами в рабочее время: {company.hours}.
        </p>
        <ConsultForm topic={topic} className="mt-6" />
      </div>
    </div>
  );
}

export function ConsultForm({ topic = "", className = "" }: { topic?: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/consultation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
          topic: data.get("topic"),
          consent: data.get("consent") === "on",
          companyWebsite: data.get("companyWebsite"),
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(payload.message || "Не удалось отправить заявку.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Нет соединения с сервером. Позвоните или напишите на почту.");
    }
  }

  if (status === "sent") {
    return (
      <p className={`border border-line bg-paper px-4 py-5 small ${className}`} role="status">
        Заявка отправлена. Мы свяжемся с вами в рабочее время.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${className}`} noValidate>
      <label className="grid gap-1 text-sm">
        <span>Имя</span>
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className="field"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span>Телефон</span>
        <input
          name="phone"
          required
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7"
          className="field"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span>Эл. почта, если удобно</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="field"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span>Тема</span>
        <select name="topic" defaultValue={topic} className="field">
          <option value="">Выберите направление</option>
          {services.map((service) => (
            <option key={service.href} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Оплата услуг">Оплата услуг</option>
          <option value="Другое">Другое</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span>Коротко о задаче</span>
        <textarea name="message" rows={4} maxLength={2000} className="field" autoComplete="off" />
      </label>
      <label className="hidden" aria-hidden="true">
        Сайт компании
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-row">
        <span className="consent-hit">
          <input name="consent" type="checkbox" required />
        </span>
        <span>
          Я ознакомлен(а) с{" "}
          <Link href="/politika-konfidencialnosti/" className="text-ink underline decoration-line underline-offset-2" target="_blank">
            Политикой конфиденциальности
          </Link>{" "}
          и даю{" "}
          <Link href="/obrabotka-personalnyh-dannyh/" className="text-ink underline decoration-line underline-offset-2" target="_blank">
            согласие на обработку персональных данных
          </Link>{" "}
          в целях обработки обращения и обратной связи. Основания: согласие субъекта (п. 1 ч. 1 ст. 6 152-ФЗ) и, при обращении за услугой, заключение и исполнение договора (п. 5 ч. 1 ст. 6 152-ФЗ).
        </span>
      </label>
      {error && (
        <p className="text-sm text-brand-dark" role="alert">
          {error} Можно позвонить{" "}
          <a className="underline" href={company.phoneHref}>
            {company.phoneDisplay}
          </a>{" "}
          или написать на{" "}
          <a className="underline" href={company.emailHref}>
            {company.email}
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-1 min-h-11 disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем" : "Получить консультацию"}
      </button>
    </form>
  );
}
