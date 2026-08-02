import { NextResponse } from "next/server";

const MAX_BODY_SIZE = 20_000;

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_SIZE) {
    return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(body.startedAt || 0);
  if (!startedAt || Date.now() - startedAt < 2_500) {
    return NextResponse.json({ ok: false, code: "too_fast" }, { status: 400 });
  }

  const required = ["name", "company", "email", "collaboration", "description"];
  if (required.some((key) => typeof body[key] !== "string" || !String(body[key]).trim())) {
    return NextResponse.json({ ok: false, code: "missing_fields" }, { status: 400 });
  }

  const email = String(body.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_TO_EMAIL || "Stevenadkins917@gmail.com";
  const sender = process.env.CONTACT_FROM_EMAIL || "Website Introduction <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const safeEntries = Object.entries(body)
    .filter(([key]) => !["website", "startedAt"].includes(key))
    .map(([key, value]) => `${key}: ${String(value).slice(0, 2_000)}`)
    .join("\n\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [destination],
      reply_to: email,
      subject: `Website introduction — ${String(body.company).slice(0, 120)}`,
      text: safeEntries,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
