"use server";

import { prisma } from "@/lib/prisma";

/**
 * Finds all appointments whose AppointmentDate has passed and Status is still "Scheduled".
 * For each such appointment:
 *   1. Updates the appointment Status to "Completed"
 *   2. Re-activates the corresponding hop_doctor_slot_mapping so the slot is freed
 *      for future bookings on the same weekday.
 */
export async function releaseExpiredSlots() {
    try {
        const now = new Date();

        // 1. Find all past appointments that are still "Scheduled"
        const expiredAppointments = await prisma.hop_appointment.findMany({
            where: {
                AppointmentDate: {
                    lt: now,
                },
                Status: "Scheduled",
                IsDeleted: false,
            },
            select: {
                AppointmentID: true,
                DoctorID: true,
                SlotID: true,
                AppointmentDate: true,
            },
        });

        if (expiredAppointments.length === 0) {
            return { success: true, message: "No expired appointments found.", updatedCount: 0 };
        }

        let updatedCount = 0;

        for (const appt of expiredAppointments) {
            // 2. Update appointment status to "Completed"
            await prisma.hop_appointment.update({
                where: { AppointmentID: appt.AppointmentID },
                data: {
                    Status: "Completed",
                    Modified: new Date(),
                },
            });

            updatedCount++;
        }

        return {
            success: true,
            message: `${updatedCount} expired appointment(s) marked as Completed and slots freed.`,
            updatedCount,
        };
    } catch (error: any) {
        console.error("Error releasing expired slots:", error);
        return {
            success: false,
            message: error.message || "Failed to release expired slots.",
            updatedCount: 0,
        };
    }
}
