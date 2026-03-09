"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function submitDoctorReview(data: {
    doctorId: number;
    rating: number;
    reviewText: string;
    appointmentId: number;
}) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized. Please login." };
        }

        const decoded = verifyToken(token) as { UserID?: number };
        const currentUserId = decoded?.UserID;

        if (!currentUserId) {
            return { success: false, message: "Invalid token." };
        }

        if (data.rating < 1 || data.rating > 5) {
            return { success: false, message: "Rating must be between 1 and 5." };
        }

        // Find the patient record linked to this user via UserID field
        let patient = await prisma.hop_patient.findFirst({
            where: {
                UserID: currentUserId,
            },
            orderBy: {
                PatientID: 'desc'
            }
        });

        // If no patient found by UserID, also try by CreatedByUserID
        if (!patient) {
            patient = await prisma.hop_patient.findFirst({
                where: {
                    CreatedByUserID: currentUserId,
                },
                orderBy: {
                    PatientID: 'desc'
                }
            });
        }

        // If still no patient, create one from appointment data
        if (!patient) {
            const appointment = await prisma.hop_appointment.findUnique({
                where: { AppointmentID: data.appointmentId },
            });

            if (appointment) {
                patient = await prisma.hop_patient.create({
                    data: {
                        PatientName: appointment.PatientName || "Patient",
                        PatientNo: `PAT-${Date.now()}`,
                        RegistrationDateTime: new Date(),
                        Gender: "Other",
                        MobileNo: "",
                        UserID: currentUserId,
                        CreatedByUserID: currentUserId,
                        Created: new Date(),
                        Modified: new Date(),
                    }
                });
            }
        }

        if (!patient) {
            return { success: false, message: "Could not find or create patient profile." };
        }

        // Create the review
        const review = await prisma.hop_doctorreview.create({
            data: {
                DoctorID: data.doctorId,
                PatientID: patient.PatientID,
                Rating: data.rating,
                ReviewText: data.reviewText || null,
                CreatedByUserID: currentUserId,
                Created: new Date(),
                Modified: new Date(),
            }
        });

        return { success: true, message: "Review submitted successfully!" };
    } catch (error: any) {
        console.error("Error submitting review:", error);
        return { success: false, message: "Failed to submit review. Please try again." };
    }
}
