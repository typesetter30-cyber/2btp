"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function InssmartWidget({ product, token, secret }: { product: string; token: string; secret: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const script = document.createElement("script");
    script.src = "https://widgets.inssmart.ru/widgets/b2c-frame.loader.js";
    script.async = true;
    script.dataset.id = "inssmart-b2c";
    script.dataset.origin = "https://widgets.inssmart.ru";
    script.dataset.product = product;
    script.dataset.token = token;
    script.dataset.secret = secret;
    host.appendChild(script);
    return () => {
      host.replaceChildren();
    };
  }, [product, token, secret]);

  return <div ref={hostRef} className="mt-8 min-h-[720px] overflow-hidden border border-line bg-white" />;
}

export function AlfaApartmentWidget() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const script = document.createElement("script");
    script.src = "https://widget.alfastrah.ru/ifl-widget-ui/injectScript.js?widget_uuid=b2741f19-d68b-4a3a-8d80-5a376d600e85";
    script.async = true;
    host.appendChild(script);
    return () => {
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className="mt-8 min-h-[640px] overflow-hidden border border-line bg-white" />;
}

const paymentServices = [
  "Бухгалтерские услуги",
  "Выездной прием",
  "Ипотечный брокер",
  "Налоговая консультация",
  "Оператор по приему платежей",
  "Оценка недвижимости",
  "Страховой брокер",
  "Юридические услуги",
];

export function PaymentForm() {
  const [agreed, setAgreed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setOrderNumber(String(Date.now()));
    if (document.querySelector("script[data-alfa-payment='1']")) return;
    const script = document.createElement("script");
    script.src = "https://acspayzonaecom.com/assets/alfa-payment.js";
    script.async = true;
    script.dataset.alfaPayment = "1";
    document.body.appendChild(script);
  }, []);

  return (
    <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
      <label className="grid gap-1 text-sm">
        ФИО
        <input required className="clientInfo field" autoComplete="name" name="payerName" />
      </label>
      <label className="grid gap-1 text-sm">
        Эл. почта
        <input required type="email" className="clientEmail field" autoComplete="email" name="payerEmail" />
      </label>
      <label className="grid gap-1 text-sm">
        Услуга
        <select required className="selectService field" defaultValue="">
          <option value="" disabled>
            Выберите услугу
          </option>
          {paymentServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        № договора или назначение платежа
        <input required className="orderDescription field" />
      </label>
      <label className="grid gap-1 text-sm">
        Сумма платежа
        <input required type="text" inputMode="decimal" autoComplete="off" name="amount" className="amount field" />
      </label>
      <input className="orderNumber" type="hidden" value={orderNumber} readOnly />
      <label className="consent-row">
        <span className="consent-hit">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
        </span>
        <span>
          Отправляя форму, я соглашаюсь с{" "}
          <Link href="/politika-konfidencialnosti/" className="text-ink underline" target="_blank">
            политикой конфиденциальности
          </Link>{" "}
          оператора, подтверждаю своё{" "}
          <Link href="/obrabotka-personalnyh-dannyh/" className="text-ink underline" target="_blank">
            согласие на обработку введённых персональных данных
          </Link>{" "}
          и получение информации по каналам связи.
        </span>
      </label>
      <div className={agreed ? "" : "pointer-events-none opacity-40 grayscale"} aria-disabled={!agreed}>
        <div
          id="alfa-payment-button"
          data-token="mj8m609lri9j1c75brpflh04ql"
          data-client-info-selector=".clientInfo"
          data-amount-selector=".amount"
          data-version="1.0"
          data-order-number-selector=".orderNumber"
          data-language="ru"
          data-stages="1"
          data-gateway="pay"
          data-return-url="https://2btp.ru/payment/success/"
          data-fail-url="https://2btp.ru/payment/fail/"
          data-amount-format="rubli"
          data-add-fio-selector=".clientInfo"
          data-add-service-selector=".selectService"
          data-email-selector=".clientEmail"
          data-description-selector=".orderDescription"
        />
      </div>
    </form>
  );
}

const allowedKeys = ["orderNumber", "order_number", "order", "amount", "sum", "paymentId", "payment_id", "status"];

export function PaymentMeta() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    try {
      sessionStorage.removeItem("payment_in_progress");
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    setLines(
      allowedKeys
        .filter((key) => params.has(key))
        .map((key) => `${key}: ${params.get(key) ?? ""}`),
    );
  }, []);

  if (!lines.length) return null;

  return (
    <p className="mt-4 text-sm text-muted">
      Данные операции:{" "}
      {lines.map((line) => (
        <code key={line} className="mr-2 rounded bg-paper px-1.5 py-0.5">
          {line}
        </code>
      ))}
    </p>
  );
}
