"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export default async function SaveAppointment(formData: FormData) {
  console.log("formData", formData, "API CALL................");
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
      return { success: false, message: "Unauthorized: No token" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      UserID?: number;
      role?: string;
      email?: string;
    };

    const currentUserId = decoded.UserID as number;
    if (!currentUserId) {
      return { success: false, message: "Unauthorized: Invalid token" };
    }
    const isSelf = formData.get("IsSelf") === "true";
    const appointmentNo = formData.get("AppointmentNo") as string;
    const doctorID = formData.get("DoctorID") as string;
    const appointmentDate = formData.get("AppointmentDate") as string;
    const status = "Pending";
    const reason = formData.get("Reason") as string;
    const slotId = formData.get("SlotID");

    // Validate critical fields
    if (!doctorID || isNaN(parseInt(doctorID))) {
      return { success: false, message: "Invalid Doctor selected." };
    }
    if (!appointmentDate || isNaN(new Date(appointmentDate).getTime())) {
      return { success: false, message: "Invalid Appointment Date." };
    }
    if (!slotId || isNaN(parseInt(slotId as string))) {
      return { success: false, message: "Invalid Slot selected." };
    }
    if (!reason || reason.trim().length < 5) {
      return { success: false, message: "Please provide a valid reason (min 5 chars)." };
    }

    let patientName = "";
    let patientAge: number | undefined = undefined;
    let address = "";
    let city = "";
    let state = "";
    let country = "";

    if (isSelf) {
      // Try to find existing patient details to autofill address/etc
      try {
        const patientProfile = await prisma.hop_patient.findFirst({
          where: { UserID: currentUserId },
        });

        if (patientProfile) {
          patientName = patientProfile.PatientName;
          patientAge = patientProfile.Age || undefined;
          address = patientProfile.Address || "";
          city = patientProfile.CityID ? patientProfile.CityID.toString() : ""; // Simplified for now
        } else {
          // Fallback to sec_user details if no patient profile
          const user = await prisma.sec_user.findUnique({
            where: { UserID: currentUserId }
          });
          if (user) {
            patientName = user.FullName;
          }
        }
      } catch (err: any) {
        console.warn("Failed to fetch patient profile relations, falling back to sec_user:", err.message);
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

      if (!patientName || patientName.trim().length < 2) {
        return { success: false, message: "Valid Patient Name is required." };
      }
      if (!patientAge || patientAge < 0 || patientAge > 120) {
        return { success: false, message: "Valid Patient Age is required." };
      }
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

    const addedData = await prisma.hop_appointment.create({ data });

    const addedID = addedData.AppointmentID;
    const newData = {
      AppointmentID: addedID,
      IUD: "I",
      Created: new Date(),
      CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_appointment.create({ data: newData });

    return { success: true, message: "Appointment booked successfully!" };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during booking.",
    };
  }
}