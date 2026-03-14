"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { console } from "inspector";

export default async function SaveAppointment(formData: FormData) {

  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    UserID?: number;
    role?: string;
  };

  console.log("Decoded JWT:", decoded.UserID, decoded.role);

  const currentUserId = decoded.UserID as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
  const appointmentNo = formData.get("AppointmentNo") as string;
  const doctorID = formData.get("DoctorID") as string;
  const appointmentDate = formData.get("AppointmentDate") as string;
  const status = formData.get("Status") as string;
  const reason = formData.get("Reason") as string;

  const data = {
    AppointmentNo: appointmentNo,
    UserID: decoded.UserID as number,
    PatientName: formData.get("PatientName") as string || "Unknown Patient",
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
