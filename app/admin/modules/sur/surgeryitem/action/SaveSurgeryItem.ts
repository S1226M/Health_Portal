"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveSurgeryItem(formData: FormData) {
    const ItemName = formData.get("ItemName") as string;
    const LabTestID = parseInt(formData.get("LabTestID") as string);
    const SurgeryID = parseInt(formData.get("SurgeryID") as string);

    await prisma.sur_surgeryitem.create({
        data: {
            ItemName,
            LabTestID: LabTestID || null, // Optional
            SurgeryID: SurgeryID || null, // Optional
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/sur/surgeryitem");
    redirect("/admin/components/sur/surgeryitem");
}
