"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deletePaymentMode(id:number) {
    await prisma.pay_paymentmode.update({
        where: {PaymentModeID:id},
        data:{IsDeleted: true}
    });

    const deleteData = {
        PaymentModeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.pay_log_paymentmode.create({data:deleteData})

    revalidatePath('/admin/modules/pay/paymentmode')
}