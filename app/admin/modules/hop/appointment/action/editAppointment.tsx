"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editAppointment(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const appointmentID = formData.get("AppointmentID") as string;
    const appointmentNo = formData.get("AppointmentNo") as string;
    const patientID = formData.get("PatientID") as string;
    const doctorID = formData.get("DoctorID") as string;
    const appointmentDate = formData.get("AppointmentDate") as string;
    const status = formData.get("Status") as string;
    const reason = formData.get("Reason") as string;    const id = parseInt(appointmentID);

    await prisma.hop_appointment.update({
        where: { AppointmentID: id },
        data: {
            AppointmentNo: appointmentNo,
            PatientID: parseInt(patientID),
            DoctorID: parseInt(doctorID),
            AppointmentDate: new Date(appointmentDate),
            Status: status,
            Reason: reason,
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        AppointmentID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_appointment.create({ data: editData });

    revalidatePath("/admin/components/hop/appointment");
    redirect("/admin/components/hop/appointment");
}
