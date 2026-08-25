"use server";

import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function requestSurgeryBooking(formData: FormData) {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.decode(token) as { UserID?: number };
    const currentUserId = decoded?.UserID;
    if (!currentUserId) throw new Error("Unauthorized");

    const surgeryId = parseInt(formData.get("SurgeryID") as string);
    const preferredDate = formData.get("PreferredDate") as string;
    const notes = formData.get("Notes") as string;
    const isSelf = formData.get("IsSelf") === "true";

    if (!preferredDate) {
        return { success: false, message: "Preferred Date is required." };
    }

    // 1. Fetch Surgery Details to apply defaults
    const surgeryDetails = await prisma.sur_surgery.findUnique({
        where: { SurgeryID: surgeryId }
    });

    if (!surgeryDetails) {
        return { success: false, message: "Surgery not found." };
    }

    // 2. Resolve Patient Details
    let patientId: number | null = null;
    const existingPatient = await prisma.hop_patient.findFirst({
        where: { UserID: currentUserId }
    });

    if (existingPatient && isSelf) {
        patientId = existingPatient.PatientID;
    } else {
        const newPatientName = formData.get("PatientName") as string;
        if (!isSelf && (!newPatientName || newPatientName.trim().length < 2)) {
            return { success: false, message: "Valid Patient Name is required if not booking for yourself." };
        }
        const patientData = await prisma.hop_patient.create({
            data: {
                PatientName: newPatientName || "Guest Patient",
                PatientNo: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
                RegistrationDateTime: new Date(),
                Gender: "Other",
                MobileNo: "0000000000",
                UserID: currentUserId,
                Created: new Date(),
                Modified: new Date(),
                CreatedByUserID: currentUserId,
            }
        });
        patientId = patientData.PatientID;
    }

    let hospitalId = surgeryDetails.HospitalID;
    if (!hospitalId) {
        const existingHosp = await prisma.hop_hospital.findFirst();
        if (existingHosp) {
            hospitalId = existingHosp.HospitalID;
        } else {
            const dummyHosp = await prisma.hop_hospital.create({
                data: {
                    HospitalName: "Main Surgical Center",
                    OpeningDate: new Date(),
                    CreatedByUserID: 1,
                    UserID: currentUserId,
                }
            });
            hospitalId = dummyHosp.HospitalID;
        }
    }

    // 3. Resolve PrimaryDoctorID and HospitalID safely
    let doctorId = 1; // fallback
    const existingDoc = await prisma.hop_doctor.findFirst();
    if (existingDoc) {
        doctorId = existingDoc.DoctorID;
    } else {
        // Create a dummy doctor if completely empty
        // const dummyDoc = await prisma.hop_doctor.create({
        //     data: {
        //         DoctorName: "Assigned Surgeon",
        //         HospitalID: hospitalId,
        //         CreatedByUserID: 1,
        //         UserID: currentUserId,
        //     }
        // });
        // doctorId = dummyDoc.DoctorID;
    }

    // Generate a mock booking number
    const bookingNo = `SUR-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
        const bookingData = await prisma.sur_surgerybooking.create({
            data: {
                SurgeryID: surgeryId,
                PatientID: patientId,
                PrimaryDoctorID: doctorId,
                HospitalID: hospitalId,
                BookingNo: bookingNo,
                BookingDateTime: new Date(),
                SurgeryDateTime: new Date(preferredDate),
                Status: "Scheduled",
                EstimatedCost: surgeryDetails.BasePrice,
                Notes: notes,
                Created: new Date(),
                Modified: new Date(),
                CreatedByUserID: currentUserId,
            }
        });

        return { success: true, message: "Surgery request submitted successfully!", bookingId: bookingData.SurgeryBookingID };
    } catch (error: any) {
        console.error("Surgery Booking Error", error);
        return { success: false, message: error.message || "Failed to submit request" };
    }
}
