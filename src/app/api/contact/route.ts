import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/content/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — submission logged, not delivered.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const { name, email, phone, subject, message } = parsed.data;
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // TODO: switch to a verified finwaveforex.com sender domain in Resend.
    from: "Finwave Forex Website <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
    replyTo: email,
    subject: `[Website] ${subject} enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send. Please call us instead." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, delivered: true });
}
