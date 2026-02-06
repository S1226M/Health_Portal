"use server"


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function SavePaymentMode(formData: FormData){
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const paymentMode = formData.get('PaymentModeName') as string;
    
    // Validate unique PaymentModeName
    const existingPaymentMode = await prisma.pay_paymentmode.findUnique({
      where: { PaymentModeName: paymentMode }
    });
    if (existingPaymentMode) {
      throw new Error("A payment mode with this name already exists");
    }

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