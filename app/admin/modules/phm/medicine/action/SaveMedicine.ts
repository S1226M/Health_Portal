"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveMedicine(formData: FormData) {
    const MedicineName = formData.get("MedicineName") as string;
    const MedicineCategoryID = parseInt(formData.get("MedicineCategoryID") as string);
    const Price = parseFloat(formData.get("Price") as string);
    const Manufacturer = formData.get("Manufacturer") as string;

    await prisma.phm_medicine.create({
        data: {
            MedicineName,
            MedicineCategoryID,
            Price,
            Manufacturer,
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/phm/medicine");
    redirect("/admin/components/phm/medicine");
}
