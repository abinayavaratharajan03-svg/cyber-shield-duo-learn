import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendGmail } from "./cybershield-mail.server";

const bookingSchema = z.object({
  program: z.string().max(120).optional().nullable(),
  full_name: z.string().trim().min(1).max(120),
  institution: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255),
  num_students: z.coerce.number().int().min(0).max(100000).optional().nullable(),
  preferred_date: z.string().trim().max(40).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("bookings").insert({
      program: data.program ?? null,
      full_name: data.full_name,
      institution: data.institution,
      phone: data.phone,
      email: data.email,
      num_students: data.num_students ?? null,
      preferred_date: data.preferred_date || null,
      message: data.message ?? null,
    });
    if (error) throw new Error(error.message);

    const body = [
      `New CyberShield awareness session booking`,
      `--------------------------------------------`,
      `Program: ${data.program ?? "—"}`,
      `Full Name: ${data.full_name}`,
      `School / College: ${data.institution}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Number of Students: ${data.num_students ?? "—"}`,
      `Preferred Date: ${data.preferred_date || "—"}`,
      ``,
      `Message:`,
      data.message || "(none)",
    ].join("\n");

    try {
      await sendGmail(`[CyberShield Booking] ${data.full_name} — ${data.institution}`, body, data.email);
    } catch (e) {
      console.error("Booking email failed:", e);
    }
    return { ok: true };
  });

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_messages").insert(data);
    if (error) throw new Error(error.message);

    const body = [
      `New CyberShield contact message`,
      `--------------------------------------------`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      ``,
      `Message:`,
      data.message,
    ].join("\n");

    try {
      await sendGmail(`[CyberShield Contact] ${data.name}`, body, data.email);
    } catch (e) {
      console.error("Contact email failed:", e);
    }
    return { ok: true };
  });
