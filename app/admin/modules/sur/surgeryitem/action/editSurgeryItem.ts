"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editSurgeryItem(formData: FormData) {
    const SurgeryItemID = parseInt(formData.get("SurgeryItemID") as string);
    const ItemName = formData.get("ItemName") as string;
    const LabTestID = parseInt(formData.get("LabTestID") as string);
    const SurgeryID = parseInt(formData.get("SurgeryID") as string);

    await prisma.sur_surgeryitem.update({
        where: { SurgeryItemID },
        data: {
            ItemName,
            LabTestID: LabTestID || null,
            SurgeryID: SurgeryID || null,
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/sur/surgeryitem");
    redirect("/admin/components/sur/surgeryitem");
}
