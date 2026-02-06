"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editSurgeryBooking(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const SurgeryBookingID = parseInt(formData.get("SurgeryBookingID") as string);
    const SurgeryID = parseInt(formData.get("SurgeryID") as string);
    const PatientID = parseInt(formData.get("PatientID") as string);
    const SurgeryDate = new Date(formData.get("SurgeryDate") as string);

    await prisma.sur_surgerybooking.update({
        where: { SurgeryBookingID },
        data: {
            SurgeryID,
            PatientID,
            SurgeryDate,
            ModifiedByUserID: currentUserId,
        }
    });

    revalidatePath("/admin/components/sur/surgerybooking");
    redirect("/admin/components/sur/surgerybooking");
}
