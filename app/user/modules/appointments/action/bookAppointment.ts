"use server";

import { prisma } from "@/lib/prisma";

export default async function bookAppointment(formData: any) {
  try {
    const AppontmentNo = formData.appointmentNo;
    const PatientID = parseInt(formData.patientId);
    const DoctorID = parseInt(formData.doctorId);

    if (isNaN(PatientID))
      return { success: false, message: "Invalid Patient ID" };
    if (isNaN(DoctorID))
      return { success: false, message: "Invalid Doctor ID" };
    if (!formData.appointmentDateTime)
      return { success: false, message: "Appointment Date is required" };

    const AppointmentDate = new Date(formData.appointmentDateTime);
    const Reason = formData.reason;

    const data = {
      AppointmentNo: AppontmentNo,
      PatientID: PatientID,
      DoctorID: DoctorID,
      Status: "Scheduled",
      AppointmentDate: AppointmentDate,
      Reason: Reason,
      CreatedByUserID: 4,
    };

    const addedData = await prisma.hop_appointment.create({ data: data });

    const addedId = addedData.AppointmentID;
    const newData = {
      AppointmentID: addedId,
      IUD: "I",
      Created: new Date(),
      CreatedByUserID: 4,
    };
    await prisma.hop_log_appointment.create({ data: newData });
    return { success: true, message: "Appointment booked successfully!" };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: error.message || "Database error occurred.",
    };
  }
}
