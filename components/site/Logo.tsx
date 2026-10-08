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
        className="h-8 w-8 sm:h-9 sm:w-9"
      />
      <span className={`logo-word ${inverted ? "text-white" : "text-ink"}`}>
        Технологии
        <span className="block">бизнеса</span>
      </span>
    </Link>
  );
}
