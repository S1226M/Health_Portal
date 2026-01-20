"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveOrderOfMedicine(formData: FormData) {
    const MedicineID = parseInt(formData.get("MedicineID") as string);
    const MedicineOrderPaymentTypeID = parseInt(formData.get("MedicineOrderPaymentTypeID") as string);
    const Quantity = parseInt(formData.get("Quantity") as string);

    await prisma.phm_orderofmedicine.create({
        data: {
            MedicineID,
            MedicineOrderPaymentTypeID,
            Quantity,
            OrderDateTime: new Date(),
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/phm/orderofmedicine");
    redirect("/admin/components/phm/orderofmedicine");
}
