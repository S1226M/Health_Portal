"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveAppointment(formData: FormData) {
    const appointmentNo = formData.get("AppointmentNo") as string;
    const patientID = formData.get("PatientID") as string;
    const doctorID = formData.get("DoctorID") as string;
    const appointmentDate = formData.get("AppointmentDate") as string;
    const status = formData.get("Status") as string;
    const reason = formData.get("Reason") as string;

    const currentUserId = 4;
    const data = {
        AppointmentNo: appointmentNo,
        PatientID: parseInt(patientID),
        DoctorID: parseInt(doctorID),
        AppointmentDate: new Date(appointmentDate),
        Status: status,
        Reason: reason,
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_appointment.create({ data });

    const addedID = addedData.AppointmentID;
    const newData = {
        AppointmentID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_appointment.create({ data: newData });

    revalidatePath("/admin/components/hop/appointment");
    redirect("/admin/components/hop/appointment");
}
