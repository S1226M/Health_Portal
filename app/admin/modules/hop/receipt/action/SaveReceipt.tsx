"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveReceipt(formData: FormData) {
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
  const ReceiptNo = formData.get("ReceiptNo") as string;
  const ReceiptDate = formData.get("ReceiptDate") as string; // Check date format
  const AmountPaid = formData.get("AmountPaid") as string;
  const OPDID = parseInt(formData.get("OPDID") as string);
  const PaymentModeID = parseInt(formData.get("PaymentModeID") as string);
  const ReferenceNo = formData.get("ReferenceNo") as string;
  const Description = formData.get("Description") as string;
  const data = {
    ReceiptNo,
    ReceiptDate: new Date(ReceiptDate),
    AmountPaid: parseFloat(AmountPaid),
    OPDID,
    PaymentModeID,
    ReferenceNo,
    Description,
    UserID: currentUserId, // Schema has UserID? likely logged in user
    Created: new Date(),
    Modified: new Date(),
    CreatedByUserID: currentUserId,
    IsDeleted: false,
  };

  const addedData = await prisma.hop_receipt.create({ data });
  const addedID = addedData.ReceiptID;

  const logData = {
    ReceiptID: addedID,
    IUD: "I",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.hop_log_receipt.create({ data: logData });

  revalidatePath("/admin/components/hop/receipt");
  redirect("/admin/components/hop/receipt");
}
