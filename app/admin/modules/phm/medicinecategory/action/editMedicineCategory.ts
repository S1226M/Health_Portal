"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editMedicineCategory(formData: FormData) {
    const MedicineCategoryID = parseInt(formData.get("MedicineCategoryID") as string);
    const CategoryName = formData.get("CategoryName") as string;

    await prisma.phm_medicinecategory.update({
        where: { MedicineCategoryID },
        data: {
            CategoryName,
            ModifiedByUserID: 4,
        }
    });

    revalidatePath("/admin/components/phm/medicinecategory");
    redirect("/admin/components/phm/medicinecategory");
}
