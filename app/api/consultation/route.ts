import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const hits = new Map<string, { count: number; reset: number }>();

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const bucket = hits.get(ip);
  if (!bucket || bucket.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
  } else if (bucket.count >= 8) {
    return NextResponse.json({ ok: false, message: "Слишком много заявок за короткое время. Позвоните нам." }, { status: 429 });
  } else {
    bucket.count += 1;
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
  }

  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 120);
  const message = clean(body.message, 2000);
  const topic = clean(body.topic, 120);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2 || digits.length < 10 || body.consent !== true) {
    return NextResponse.json(
      { ok: false, message: "Укажите имя, телефон и подтвердите согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Проверьте адрес электронной почты." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.LEAD_TO || "911@2btp.ru";

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      { ok: false, message: "Автоматическая отправка заявки пока не настроена." },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: "Заявка с сайта 2btp.ru",
      text: [
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Почта: ${email || "—"}`,
        `Тема: ${topic || "—"}`,
        `Сообщение: ${message || "—"}`,
        "Согласие на обработку персональных данных: да",
      ].join("\n"),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Письмо не отправилось. Позвоните или напишите на почту." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
