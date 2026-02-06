"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editOPD(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const opdID = formData.get("OPDID") as string;
    const opdDateTime = formData.get("OPDDateTime") as string;
    const patientID = formData.get("PatientID") as string;
    const isFollowUpCase = formData.get("IsFollowUpCase") === 'on';
    const treatedByDoctorID = formData.get("TreatedByDoctorID") as string;
    const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
    const otherDiagnosis = formData.get("OtherDiagnosis") as string;
    const registrationFee = formData.get("RegistrationFee") as string;
    const appointmentID = formData.get("AppointmentID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;    const id = parseInt(opdID);

    await prisma.hop_opd.update({
        where: { OPDID: id },
        data: {
            OPDDateTime: new Date(opdDateTime),
            PatientID: parseInt(patientID),
            IsFollowUpCase: isFollowUpCase,
            TreatedByDoctorID: parseInt(treatedByDoctorID),
            DiagnosisTypeID: diagnosisTypeID ? parseInt(diagnosisTypeID) : null,
            OtherDiagnosis: otherDiagnosis,
            RegistrationFee: parseFloat(registrationFee),
            AppointmentID: appointmentID ? parseInt(appointmentID) : null,
            Description: description,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        OPDID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_opd.create({ data: editData });

    revalidatePath("/admin/components/hop/opd");
    redirect("/admin/components/hop/opd");
}
