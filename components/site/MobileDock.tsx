"use client";

import { useEffect } from "react";
import { ConsultButton } from "@/components/site/Consult";
import { company } from "@/lib/site";

export function MobileDock() {
  useEffect(() => {
    document.body.classList.add("has-mobile-cta");
    return () => document.body.classList.remove("has-mobile-cta");
  }, []);

  return (
    <div className="mobile-dock lg:hidden">
      <a href={company.phoneHref} className="btn btn-line flex-1 min-h-11">
        Позвонить
      </a>
      <ConsultButton className="flex-1 min-h-11">Консультация</ConsultButton>
    </div>
  );
}
