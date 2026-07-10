import { z } from "zod";

export const contactSubjects = [
  "general",
  "currency-exchange",
  "remittance",
  "travel-cards",
  "corporate-fx",
  "rate-enquiry",
] as const;

export const contactSubjectLabels: Record<(typeof contactSubjects)[number], string> = {
  general: "General enquiry",
  "currency-exchange": "Currency exchange",
  remittance: "Wire transfer / remittance",
  "travel-cards": "Travel currency card",
  "corporate-fx": "Corporate / business FX",
  "rate-enquiry": "Rate enquiry",
};

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  subject: z.enum(contactSubjects),
  message: z.string().min(10, "Tell us a little more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
