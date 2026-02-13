"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function EditReceiptTran(formData: FormData) {
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
  const receiptTranID = parseInt(formData.get("ReceiptTranID") as string);
  const ReceiptID = parseInt(formData.get("ReceiptID") as string);

  // Check for "0" or empty string when optional
  const SubTreatmentTypeID =
    formData.get("SubTreatmentTypeID") &&
    formData.get("SubTreatmentTypeID") !== "0"
      ? parseInt(formData.get("SubTreatmentTypeID") as string)
      : null;
  const MedicineID =
    formData.get("MedicineID") && formData.get("MedicineID") !== "0"
      ? parseInt(formData.get("MedicineID") as string)
      : null;
  const LabTestID =
    formData.get("LabTestID") && formData.get("LabTestID") !== "0"
      ? parseInt(formData.get("LabTestID") as string)
      : null;

  const AmountTotal = formData.get("AmountTotal") as string;
  const Description = formData.get("Description") as string;
  const data = {
    ReceiptID,
    SubTreatmentTypeID,
    MedicineID,
    LabTestID,
    AmountTotal: parseFloat(AmountTotal),
    Description,
    Modified: new Date(),
    ModifiedByUserID: currentUserId,
  };

  await prisma.hop_receipttran.update({
    where: { ReceiptTranID: receiptTranID },
    data: data,
  });

  const logData = {
    ReceiptTranID: receiptTranID,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.hop_log_receipttran.create({ data: logData });

  revalidatePath("/admin/components/hop/receipttran");
  redirect("/admin/components/hop/receipttran");
}
