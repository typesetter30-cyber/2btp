import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="logo-link min-w-0 shrink">
      <Image
        src="/brand/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-8 w-8 sm:h-10 sm:w-10"
      />
      <span className={`font-serif text-[13px] leading-[1.15] tracking-tight sm:text-[15px] ${inverted ? "text-paper" : "text-ink"}`}>
        Технологии
        <span className="block">бизнеса</span>
      </span>
    </Link>
  );
}
