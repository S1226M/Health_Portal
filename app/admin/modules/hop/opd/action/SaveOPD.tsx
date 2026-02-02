"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveOPD(formData: FormData) {
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
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const data = {
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
