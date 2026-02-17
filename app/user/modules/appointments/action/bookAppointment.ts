"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveAppointment(formData: FormData) {

  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    UserID?: number;
    role?: string;
  };

  // console.log("Decoded JWT:", decoded.UserID, decoded.role);

  const currentUserId = decoded.UserID as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
  const isSelf = formData.get("IsSelf") === "true";
  const appointmentNo = formData.get("AppointmentNo") as string;
  const doctorID = formData.get("DoctorID") as string;
  const appointmentDate = formData.get("AppointmentDate") as string;
  const status = "Scheduled";
  const reason = formData.get("Reason") as string;

  let patientName = "";
  let patientAge: number | undefined = undefined;
  let address = "";
  let city = "";
  let state = "";
  let country = "";

  const slotId = formData.get("SlotID");

  if (isSelf) {
    // Try to find existing patient details to autofill address/etc
    const patientProfile = await prisma.hop_patient.findFirst({
      where: { UserID: currentUserId },
      include: { loc_city: { include: { loc_state: { include: { loc_country: true } } } } }
    });

    if (patientProfile) {
      patientName = patientProfile.PatientName;
      patientAge = patientProfile.Age || undefined;
      address = patientProfile.Address || "";
      city = patientProfile.loc_city?.CityName || "";
      state = patientProfile.loc_city?.loc_state?.StateName || "";
      country = patientProfile.loc_city?.loc_state?.loc_country?.CountryName || "";
    } else {
      // Fallback to sec_user details if no patient profile
      const user = await prisma.sec_user.findUnique({
        where: { UserID: currentUserId }
      });
      if (user) {
        patientName = user.FullName;
      }
    }
  } else {
    patientName = formData.get("PatientName") as string;
    const ageStr = formData.get("PatientAge") as string;
    if (ageStr) patientAge = parseInt(ageStr);
    address = formData.get("Address") as string;
    city = formData.get("City") as string;
    state = formData.get("State") as string;
    country = formData.get("Country") as string;
  }

  const data = {
    AppointmentNo: appointmentNo,
    UserID: currentUserId,
    DoctorID: parseInt(doctorID),
    SlotID: slotId ? parseInt(slotId as string) : null,
    AppointmentDate: new Date(appointmentDate),
    Status: status,
    Reason: reason,
    PatientName: patientName,
    PatientAge: patientAge,
    Address: address,
    City: city,
    State: state,
    Country: country,
    Created: new Date(),
    CreatedByUserID: currentUserId,
    Modified: new Date(),
  };

  try {
    const addedData = await prisma.hop_appointment.create({ data });

    const addedID = addedData.AppointmentID;
    const newData = {
      AppointmentID: addedID,
      IUD: "I",
      Created: new Date(),
      CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_appointment.create({ data: newData });

    // revalidatePath("/user/components/hop/appointment"); // Adjust path if necessary
    return { success: true, message: "Appointment booked successfully!" };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: error.message || "Database error occurred.",
    };
  }
}