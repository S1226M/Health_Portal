"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editOPDDiagnosisType(formData: FormData) {
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
  const opdDiagnosisTypeID = formData.get("OPDDiagnosisTypeID") as string;
  const opdID = formData.get("OPDID") as string;
  const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
  const description = formData.get("Description") as string;
  const userID = formData.get("UserID") as string;
  const id = parseInt(opdDiagnosisTypeID);

  await prisma.hop_opddiagnosistype.update({
    where: { OPDDiagnosisTypeID: id },
    data: {
      OPDID: parseInt(opdID),
      DiagnosisTypeID: parseInt(diagnosisTypeID),
      Description: description,
      UserID: parseInt(userID),
      Modified: new Date(),
      ModifiedByUserID: currentUserId,
    },
  });

  const editData = {
    OPDDiagnosisTypeID: id,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.hop_log_opddiagnosistype.create({ data: editData });

  revalidatePath("/admin/components/hop/opddiagnosistype");
  redirect("/admin/components/hop/opddiagnosistype");
}
