"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveSurgeryBooking(formData: FormData) {
    const SurgeryID = parseInt(formData.get("SurgeryID") as string);
    const PatientID = parseInt(formData.get("PatientID") as string);
    const SurgeryDate = new Date(formData.get("SurgeryDate") as string);

    await prisma.sur_surgerybooking.create({
        data: {
            SurgeryID,
            PatientID,
            SurgeryDate,
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/sur/surgerybooking");
    redirect("/admin/components/sur/surgerybooking");
}
