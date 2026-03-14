"use server";

import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function bookLabTest(formData: FormData) {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.decode(token) as { UserID?: number };
    const currentUserId = decoded?.UserID;
    if (!currentUserId) throw new Error("Unauthorized");

    const labTestId = parseInt(formData.get("LabTestID") as string);
    const isSelf = formData.get("IsSelf") === "true";

    let patientId: number | null = null;

    // Let's resolve the patient linking. 
    // Normally the user chooses an existing patient or creates one. 
    // For simplicity, we fetch the first patient linked to this user, or create a stub patient if none exist.
    const existingPatient = await prisma.hop_patient.findFirst({
        where: { UserID: currentUserId }
    });

    if (existingPatient && isSelf) {
        patientId = existingPatient.PatientID;
    } else {
        // We would create a new patient here based on form details.
        // Simplifying to avoid too much schema-required fields blocking
        const newPatientName = formData.get("PatientName") as string || "Guest Patient";
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

    // Find a generic LabTestType for LabTestID
    let labType = await prisma.lab_labtesttype.findFirst();

    if (!labType) {
        // Create a default one if DB is missing configuration
        labType = await prisma.lab_labtesttype.create({
            data: {
                LabTestTypeName: "General Diagnostics",
                CreatedByUserID: currentUserId,
            }
        });
    }

    try {
        const orderData = await prisma.lab_labtestorder.create({
            data: {
                PatientID: patientId,
                LabTestTypeID: labType.LabTestTypeID,
                LabTestID: labTestId,
                PaymentStatus: false,
                OrderDateTime: new Date(),
                Created: new Date(),
                Modified: new Date(),
                CreatedByUserID: currentUserId,
            }
        });

        return { success: true, message: "Test booked successfully!", orderId: orderData.LabTestOrderID };
    } catch (error: any) {
        console.error("Booking Error", error);
        return { success: false, message: error.message || "Failed to book" };
    }
}
