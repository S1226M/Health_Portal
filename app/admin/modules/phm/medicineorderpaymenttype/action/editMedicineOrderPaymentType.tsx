import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editMedicineOrderPaymentType(formData: FormData) {
    const MedicineOrderPaymentTypeID = parseInt(formData.get("MedicineOrderPaymentTypeID") as string);
    const MedicineOrderPaymentTypeName = formData.get("PaymentTypeName") as string;

    await prisma.phm_medicineorderpaymenttype.update({
        where: { MedicineOrderPaymentTypeID },
        data: {
            MedicineOrderPaymentTypeName,
            ModifiedByUserID: 4,
        }
    });
    revalidatePath("/admin/components/phm/medicineorderpaymenttype");
    redirect("/admin/components/phm/medicineorderpaymenttype");
}