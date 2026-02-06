"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveOPD(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const opdDateTime = formData.get("OPDDateTime") as string;
    const patientID = formData.get("PatientID") as string;
    const _isFollowUpCase = formData.get("IsFollowUpCase");
    const isFollowUpCase = (_isFollowUpCase === 'on' || _isFollowUpCase === 'true' || _isFollowUpCase === '1');
    const treatedByDoctorID = formData.get("TreatedByDoctorID") as string;
    const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
    const otherDiagnosis = formData.get("OtherDiagnosis") as string;
    const registrationFee = formData.get("RegistrationFee") as string;
    const appointmentID = formData.get("AppointmentID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;    const data = {
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
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_opd.create({ data });

    const addedID = addedData.OPDID;
    const newData = {
        OPDID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_opd.create({ data: newData });

    revalidatePath("/admin/components/hop/opd");
    redirect("/admin/components/hop/opd");
}
