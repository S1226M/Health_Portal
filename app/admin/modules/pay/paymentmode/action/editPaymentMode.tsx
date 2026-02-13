"use server";

import { prisma } from "@/lib/prisma";
import { create } from "domain";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editPaymentMode(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId?: number;
    UserID?: number;
    role?: string;
  };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
  const rawId = formData.get("PaymentModeID");
  const paymentModeId = parseInt(rawId as string);

  if (isNaN(paymentModeId)) {
    throw new Error("Invalid Country ID");
  }

  const paymentModeName = formData.get("PaymentModeName") as string;

  // Validate unique PaymentModeName if changing
  const currentPaymentMode = await prisma.pay_paymentmode.findUnique({
    where: { PaymentModeID: paymentModeId },
  });
  if (
    currentPaymentMode &&
    currentPaymentMode.PaymentModeName !== paymentModeName
  ) {
    const existingPaymentMode = await prisma.pay_paymentmode.findUnique({
      where: { PaymentModeName: paymentModeName },
    });
    if (existingPaymentMode) {
      throw new Error("A payment mode with this name already exists");
    }
  }

  await prisma.pay_paymentmode.update({
    where: {
      PaymentModeID: paymentModeId,
    },
    data: {
      PaymentModeName: paymentModeName,
      ModifiedByUserID: currentUserId,
      Modified: new Date(),
    },
  });

  const editData = {
    PaymentModeID: paymentModeId,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.pay_log_paymentmode.create({ data: editData });

  revalidatePath("/admin/components/pay/paymentmode");
  redirect("/admin/components/pay/paymentmode");
}
