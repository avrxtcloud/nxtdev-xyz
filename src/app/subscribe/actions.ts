"use server";

import { Resend } from 'resend';
import { env } from "@/lib/env";
import { z } from "zod";

const resend = new Resend(env.RESEND_API_KEY);

const SubscribeSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

export async function subscribeAction(prevState: any, formData: FormData) {
    const email = formData.get("email");

    const validated = SubscribeSchema.safeParse({ email });
    if (!validated.success) {
        return { error: validated.error.issues[0]?.message || "Invalid input" };
    }

    try {
        await resend.contacts.create({
            email: validated.data.email,
            audienceId: env.RESEND_AUDIENCE_ID,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Subscription error:", error);
        // Even if it fails (e.g. user already exists), we might want to show success to prevent email enumeration 
        // but Resend returns a clear error.
        if (error.message?.includes("already exists")) {
            return { success: true };
        }
        return { error: "Failed to subscribe. Please try again later." };
    }
}
