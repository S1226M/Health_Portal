"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SavePaymentMode(formData: FormData){
    const paymentMode = formData.get('PaymentModeName') as string;

    const currentUserId = 4;

    const data = {
        PaymentModeName: paymentMode,
        Created: new Date(),
        CreatedByUserID: currentUserId
    }

    const addedData = await prisma.pay_paymentmode.create({data});

    const addedID = addedData.PaymentModeID;

    const newData = {
        PaymentModeID: addedID,
        IUD:'I',
        Created : new Date(),
        CreatedByUserID: currentUserId    
    }

    await prisma.pay_log_paymentmode.create({data:newData});

    revalidatePath('/admin/components/pay/paymentmode')
    redirect('/admin/components/pay/paymentmode')
}