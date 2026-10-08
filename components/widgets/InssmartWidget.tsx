"use client";

import { useEffect, useRef } from "react";

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
