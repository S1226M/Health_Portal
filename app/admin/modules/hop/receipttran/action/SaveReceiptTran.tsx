"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveReceiptTran(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const ReceiptID = parseInt(formData.get("ReceiptID") as string);
    const SubTreatmentTypeID = formData.get("SubTreatmentTypeID") ? parseInt(formData.get("SubTreatmentTypeID") as string) : null;
    const MedicineID = formData.get("MedicineID") ? parseInt(formData.get("MedicineID") as string) : null;
    const LabTestID = formData.get("LabTestID") ? parseInt(formData.get("LabTestID") as string) : null;
    const AmountTotal = formData.get("AmountTotal") as string;
    const Description = formData.get("Description") as string;    const data = {
        ReceiptID,
        SubTreatmentTypeID,
        MedicineID,
        LabTestID,
        AmountTotal: parseFloat(AmountTotal),
        Description,
        UserID: currentUserId,
        Created: new Date(),
        Modified: new Date(),
        CreatedByUserID: currentUserId,
        IsDeleted: false,
    };

    const addedData = await prisma.hop_receipttran.create({ data });
    const addedID = addedData.ReceiptTranID;

    const logData = {
        ReceiptTranID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_receipttran.create({ data: logData });

    revalidatePath("/admin/components/hop/receipttran");
    redirect("/admin/components/hop/receipttran");
}
