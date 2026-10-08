"use client";

import { useEffect, useState } from "react";

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
    setLines(allowedKeys.filter((key) => params.has(key)).map((key) => `${key}: ${params.get(key) ?? ""}`));
  }, []);

  if (!lines.length) return null;

  return (
    <p className="mt-4 text-sm text-muted">
      Данные операции:{" "}
      {lines.map((line) => (
        <code key={line} className="mr-2 bg-paper px-1.5 py-0.5">
          {line}
        </code>
      ))}
    </p>
  );
}
