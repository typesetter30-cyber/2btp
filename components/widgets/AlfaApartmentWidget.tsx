"use client";

import { useEffect, useRef } from "react";

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
