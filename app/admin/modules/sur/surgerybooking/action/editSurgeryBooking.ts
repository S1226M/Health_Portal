"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editSurgeryBooking(formData: FormData) {
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
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/sur/surgerybooking");
    redirect("/admin/components/sur/surgerybooking");
}
