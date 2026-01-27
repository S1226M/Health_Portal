import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMedicineOrderPaymentType(id: number){
    await prisma.phm_medicineorderpaymenttype.update({
        where: {MedicineOrderPaymentTypeID: id},
        data: {IsDeleted: true}
    });

    const deleteData = {
        MedicineOrderPaymentTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }
    await prisma.phm_log_medicineorderpaymenttype.create({data: deleteData})
    revalidatePath('/admin/components/phm/medicineorderpaymenttype')

} 