"use server"
import { prisma } from "@/lib/prisma";
import { create } from "domain";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editPaymentMode(formData:FormData){
    const rawId = formData.get('PaymentModeID');
    const paymentModeId = parseInt(rawId as string);

    if (isNaN(paymentModeId)){
        throw new Error("Invalid Country ID");
    }

    const currentUserId = 4;

    await prisma.pay_paymentmode.update({
        where:{
            PaymentModeID:paymentModeId
        },
        data:{
            PaymentModeName:formData.get('PaymentModeName') as string,
            ModifiedByUserID: currentUserId,
            Modified: new Date()
        }
    });

    const editData = {
        PaymentModeID:paymentModeId,
        IUD:'U',
        Created: new Date(),
        CreatedByUserID: currentUserId
    }

    await prisma.pay_log_paymentmode.create({data:editData});

    revalidatePath('/admin/components/pay/paymentmode');
    redirect('/admin/components/pay/paymentmode');
}