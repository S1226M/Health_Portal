"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editOrderOfMedicine(formData: FormData) {
    const OrderOfMedicineID = parseInt(formData.get("OrderOfMedicineID") as string);
    const MedicineID = parseInt(formData.get("MedicineID") as string);
    const MedicineOrderPaymentTypeID = parseInt(formData.get("MedicineOrderPaymentTypeID") as string);
    const Quantity = parseInt(formData.get("Quantity") as string);

    await prisma.phm_orderofmedicine.update({
        where: { OrderOfMedicineID },
        data: {
            MedicineID,
            MedicineOrderPaymentTypeID,
            Quantity,
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/phm/orderofmedicine");
    redirect("/admin/components/phm/orderofmedicine");
}
