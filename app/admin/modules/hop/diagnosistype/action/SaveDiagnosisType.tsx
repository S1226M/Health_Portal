"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveDiagnosisType(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const diagnosisTypeName = formData.get("DiagnosisTypeName") as string;
    const diagnosisTypeShortName = formData.get("DiagnosisTypeShortName") as string;
    const isActive = formData.get("IsActive") === 'on';
    const hospitalID = formData.get("HospitalID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;    const data = {
        DiagnosisTypeName: diagnosisTypeName,
        DiagnosisTypeShortName: diagnosisTypeShortName,
        IsActive: isActive,
        HospitalID: parseInt(hospitalID),
        Description: description,
        UserID: parseInt(userID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_diagnosistype.create({ data });

    const addedID = addedData.DiagnosisTypeID;
    const newData = {
        DiagnosisTypeID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_diagnosistype.create({ data: newData });

    revalidatePath("/admin/components/hop/diagnosistype");
    redirect("/admin/components/hop/diagnosistype");
}
