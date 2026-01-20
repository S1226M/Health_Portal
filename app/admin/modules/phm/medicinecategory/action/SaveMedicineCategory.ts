"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveMedicineCategory(formData: FormData) {
    const CategoryName = formData.get("CategoryName") as string;

    await prisma.phm_medicinecategory.create({
        data: {
            CategoryName,
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/phm/medicinecategory");
    redirect("/admin/components/phm/medicinecategory");
}
