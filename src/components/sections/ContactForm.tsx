"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  contactSubjectLabels,
  contactSubjects,
  type ContactInput,
} from "@/lib/contact-schema";
import { siteConfig } from "@/content/site";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; delivered: boolean }
  | { state: "error" };

export function ContactForm({ defaultSubject = "general" }: { defaultSubject?: ContactInput["subject"] }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject, phone: "" },
  });

  // On a static host there is no server. If a form-backend endpoint is
  // configured (e.g. Formspree / Web3Forms) we POST to it for real inbox
  // delivery; otherwise we fall back to opening the visitor's email client.
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function onSubmit(data: ContactInput) {
    setStatus({ state: "submitting" });
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus({ state: "success", delivered: true });
        return;
      }

      const subject = `[Website] ${contactSubjectLabels[data.subject]} - ${data.name}`;
      const lines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "-"}`,
        "",
        data.message,
      ];
      const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(lines.join("\n"))}`;
      window.location.assign(mailto);
      setStatus({ state: "success", delivered: false });
    } catch {
      setStatus({ state: "error" });
    }
  }

  if (status.state === "success") {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-brand" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold tracking-tight">
          Thanks, we&apos;ll get back to you shortly.
        </h3>
        {!status.delivered ? (
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Your email app should open with the details ready to send. If it doesn&apos;t, call us
            on{" "}
            <a href={siteConfig.phoneHref} className="font-medium text-brand underline underline-offset-2">
              {siteConfig.phone}
            </a>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-hairline bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="text-sm text-red-600">
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-red-600">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="font-normal text-ink-soft">(optional)</span>
          </Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            className="h-11 w-full min-w-0 rounded-xl border border-input bg-transparent px-3.5 py-2 text-base shadow-xs transition-colors outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 sm:text-sm"
            {...register("subject")}
          >
            {contactSubjects.map((value) => (
              <option key={value} value={value}>
                {contactSubjectLabels[value]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Currency, amount, and city, we'll come back with a rate."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-red-600">
            {errors.message.message}
          </p>
        ) : null}
      </div>
      {status.state === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong sending your message. Please call us on{" "}
          <a href={siteConfig.phoneHref} className="font-medium underline underline-offset-2">
            {siteConfig.phone}
          </a>
          .
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status.state === "submitting"} className="w-full">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
