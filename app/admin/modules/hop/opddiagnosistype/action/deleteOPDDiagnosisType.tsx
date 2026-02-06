"use server"



import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function deleteOPDDiagnosisType(id: number) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    await prisma.hop_opddiagnosistype.update({
        where: { OPDDiagnosisTypeID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        OPDDiagnosisTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: currentUserId
    }

    await prisma.hop_log_opddiagnosistype.create({ data: deleteData });

    revalidatePath('/admin/components/hop/opddiagnosistype');
}
