"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editMedicine(formData: FormData) {
    const MedicineID = parseInt(formData.get("MedicineID") as string);
    const MedicineName = formData.get("MedicineName") as string;
    const MedicineCategoryID = parseInt(formData.get("MedicineCategoryID") as string);
    const Price = parseFloat(formData.get("Price") as string);
    const Manufacturer = formData.get("Manufacturer") as string;

    await prisma.phm_medicine.update({
        where: { MedicineID },
        data: {
            MedicineName,
            MedicineCategoryID,
            Price,
            Manufacturer,
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/phm/medicine");
    redirect("/admin/components/phm/medicine");
}
