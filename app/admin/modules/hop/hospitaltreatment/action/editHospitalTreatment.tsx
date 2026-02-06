"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editHospitalTreatment(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const hospitalTreatmentID = formData.get("HospitalTreatmentID") as string;
    const hospitalID = formData.get("HospitalID") as string;
    const treatmentTypeID = formData.get("TreatmentTypeID") as string;

    const id = parseInt(hospitalTreatmentID);

    // Validate composite unique constraint (HospitalID + TreatmentTypeID) if either field changed
    const currentRecord = await prisma.hop_hospitaltreatment.findUnique({
      where: { HospitalTreatmentID: id }
    });
    if (currentRecord && (currentRecord.HospitalID !== parseInt(hospitalID) || currentRecord.TreatmentTypeID !== parseInt(treatmentTypeID))) {
      const existingRecord = await prisma.hop_hospitaltreatment.findUnique({
        where: { HospitalID_TreatmentTypeID: { HospitalID: parseInt(hospitalID), TreatmentTypeID: parseInt(treatmentTypeID) } }
      });
      if (existingRecord && !existingRecord.IsDeleted) {
        throw new Error("This hospital treatment combination already exists");
      }
    }

    await prisma.hop_hospitaltreatment.update({
        where: { HospitalTreatmentID: id },
        data: {
            HospitalID: parseInt(hospitalID),
            TreatmentTypeID: parseInt(treatmentTypeID),
        },
    });

    const editData = {
        HospitalTreatmentID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_hospitaltreatment.create({ data: editData });

    revalidatePath("/admin/components/hop/hospitaltreatment");
    redirect("/admin/components/hop/hospitaltreatment");
}
