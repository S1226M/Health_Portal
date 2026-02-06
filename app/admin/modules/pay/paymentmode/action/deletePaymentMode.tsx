"use server"



import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function deletePaymentMode(id:number) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    await prisma.pay_paymentmode.update({
        where: {PaymentModeID:id},
        data:{IsDeleted: true}
    });

    const deleteData = {
        PaymentModeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: currentUserId
    }

    await prisma.pay_log_paymentmode.create({data:deleteData})

    revalidatePath('/admin/modules/pay/paymentmode')
}