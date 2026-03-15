"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { baseFqdnForLabel, reservedLabelSchema } from "@/lib/validators/domain";

function optionalId(value: FormDataEntryValue | null): string | null {
  const v = String(value ?? "").trim();
  return v.length ? v : null;
}

export async function reserveSubdomainAction(formData: FormData) {
  const admin = await requireAdmin();

  const labelRaw = String(formData.get("label") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  const reservedForUserId = optionalId(formData.get("reservedForUserId"));

  const parsed = reservedLabelSchema.safeParse(labelRaw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid label");

  const baseFqdn = baseFqdnForLabel(parsed.data, env.ROOT_DOMAIN);

  const [{ count: takenCount, error: takenErr }, { count: reservedCount, error: reservedErr }] =
    await Promise.all([
      supabaseAdmin
        .from("Subdomain")
        .select("id", { head: true, count: "exact" })
        .eq("baseFqdn", baseFqdn),
      supabaseAdmin
        .from("ReservedSubdomain")
        .select("id", { head: true, count: "exact" })
        .eq("baseFqdn", baseFqdn),
    ]);
  if (takenErr) throw new Error(takenErr.message);
  if (reservedErr) {
    if (reservedErr.message?.includes("schema cache") || reservedErr.message?.includes("Could not find the table")) {
      throw new Error(
        "Missing Supabase tables: ReservedSubdomain. Run `supabase_schema.sql` in Supabase SQL Editor, then reload the schema cache.",
      );
    }
    throw new Error(reservedErr.message);
  }
  if ((takenCount ?? 0) > 0) throw new Error("That subdomain is already claimed");
  if ((reservedCount ?? 0) > 0) throw new Error("That subdomain is already reserved");

  const now = new Date().toISOString();
  const id = randomUUID();
  const { error: insertErr } = await supabaseAdmin.from("ReservedSubdomain").insert({
    id,
    label: parsed.data,
    baseFqdn,
    note: note.length ? note : null,
    reservedForUserId,
    createdAt: now,
    createdByUserId: admin.id,
  });
  if (insertErr) throw new Error(insertErr.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.reservation.create",
    targetType: "reserved_subdomain",
    targetId: id,
    metadata: { baseFqdn, reservedForUserId },
  });

  revalidatePath("/admin/reservations");
}

export async function deleteReservationAction(reservationId: string) {
  const admin = await requireAdmin();

  const { data: existing, error: findErr } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("id,baseFqdn")
    .eq("id", reservationId)
    .maybeSingle();
  if (findErr) throw new Error(findErr.message);
  if (!existing) throw new Error("Reservation not found");

  const { error } = await supabaseAdmin.from("ReservedSubdomain").delete().eq("id", reservationId);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.reservation.delete",
    targetType: "reserved_subdomain",
    targetId: reservationId,
    metadata: { baseFqdn: existing.baseFqdn },
  });

  revalidatePath("/admin/reservations");
}

export async function releaseReservationToUserAction(reservationId: string, formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") ?? "").trim();
  if (!userId) throw new Error("Select a user");

  const { data: reservation, error: resErr } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();
  if (resErr) throw new Error(resErr.message);
  if (!reservation) throw new Error("Reservation not found");

  const { data: user, error: userErr } = await supabaseAdmin
    .from("User")
    .select("id,email,status")
    .eq("id", userId)
    .maybeSingle();
  if (userErr) throw new Error(userErr.message);
  if (!user) throw new Error("User not found");
  if (user.status !== "active") throw new Error("User is not active");

  const { count: existingCount, error: countErr } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("userId", userId);
  if (countErr) throw new Error(countErr.message);
  if ((existingCount ?? 0) >= 2) throw new Error("Target user already has 2 subdomains");

  const { count: takenCount, error: takenErr } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("baseFqdn", reservation.baseFqdn as string);
  if (takenErr) throw new Error(takenErr.message);
  if ((takenCount ?? 0) > 0) throw new Error("That subdomain is already claimed");

  const now = new Date().toISOString();
  const subdomainId = randomUUID();
  const { error: createErr } = await supabaseAdmin.from("Subdomain").insert({
    id: subdomainId,
    userId,
    label: reservation.label,
    baseFqdn: reservation.baseFqdn,
    status: "active",
    riskScore: 0,
    createdAt: now,
    updatedAt: now,
  });
  if (createErr) throw new Error(createErr.message);

  const { error: deleteErr } = await supabaseAdmin
    .from("ReservedSubdomain")
    .delete()
    .eq("id", reservationId);
  if (deleteErr) throw new Error(deleteErr.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.reservation.release",
    targetType: "subdomain",
    targetId: subdomainId,
    metadata: {
      baseFqdn: reservation.baseFqdn,
      releasedFromReservationId: reservationId,
      releasedToUserId: userId,
      releasedToEmail: user.email,
    },
  });

  revalidatePath("/admin/reservations");
  revalidatePath("/admin/subdomains");
}
