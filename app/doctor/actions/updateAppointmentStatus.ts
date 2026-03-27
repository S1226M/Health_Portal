"use server";

import { prisma } from "@/lib/prisma";
import { getDoctorByUserId } from "./getDoctorByUserId";
import { sendMail } from "@/lib/sendMail";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

export async function updateAppointmentStatus({
    appointmentId,
    newStatus,
    messageFromDoctor,
}: {
    appointmentId: number;
    newStatus: "Approved" | "Rejected";
    messageFromDoctor?: string;
}) {
    const doctor = await getDoctorByUserId();
    if (!doctor) {
        return { success: false, message: "Unauthorized: Not a doctor." };
    }

    try {
        // Verify the appointment belongs to this doctor
        const appointment = await prisma.hop_appointment.findFirst({
            where: {
                AppointmentID: appointmentId,
                DoctorID: doctor.DoctorID,
                IsDeleted: false,
            },
        });

        if (!appointment) {
            return { success: false, message: "Appointment not found." };
        }

        if (appointment.Status !== "Pending") {
            return { success: false, message: `Appointment is already ${appointment.Status}.` };
        }

        // Build update data
        const updateData: any = {
            Status: newStatus,
            Modified: new Date(),
            ModifiedByUserID: doctor.UserID,
        };

        if (messageFromDoctor) {
            updateData.MessageFromDoctor = messageFromDoctor;
        }

        // If rejected, free up the slot by setting SlotID to null
        if (newStatus === "Rejected") {
            updateData.SlotID = null;
        }

        await prisma.hop_appointment.update({
            where: { AppointmentID: appointmentId },
            data: updateData,
        });

        // Log the update
        await prisma.hop_log_appointment.create({
            data: {
                AppointmentID: appointmentId,
                IUD: "U",
                Created: new Date(),
                CreatedByUserID: doctor.UserID,
            },
        });

        // Send confirmation email to the user for both Approved and Rejected
        try {
            // Get the user's email
            const user = await prisma.sec_user.findUnique({
                where: { UserID: appointment.UserID },
                select: { Email: true, FullName: true },
            });

            if (user?.Email) {
                const dateStr = appointment.AppointmentDate
                    ? dayjs(appointment.AppointmentDate).format("dddd, MMMM D, YYYY")
                    : "TBD";

                let subject = "";
                let message = "";

                if (newStatus === "Approved") {
                    subject = "Appointment Approved ✓";
                    message = `Great news! Your appointment with Dr. ${doctor.DoctorName} on ${dateStr} has been approved.`;
                } else if (newStatus === "Rejected") {
                    subject = "Appointment Update ℹ️";
                    message = `We write to inform you that your appointment request with Dr. ${doctor.DoctorName} on ${dateStr} could not be approved at this time.`;
                    if (messageFromDoctor) {
                        message += `<br><br><b>Doctor's Note:</b> ${messageFromDoctor}`;
                    }
                    message += `<br><br>Please visit our portal to book an alternative time slot.`;
                }

                if (subject && message) {
                    await sendMail({
                        to: user.Email,
                        subject,
                        message,
                        doctorName: doctor.DoctorName,
                        name: user.FullName || appointment.PatientName,
                    });
                }
            }
        } catch (emailErr) {
            console.error("Failed to send status update email:", emailErr);
            // Don't fail the action if email fails
        }

        revalidatePath("/doctor");
        revalidatePath("/doctor/modules/appointments");
        revalidatePath("/doctor/modules/patients");
        revalidatePath("/user/modules/hop/appointment/viewBookedAppointment");

        return {
            success: true,
            message: `Appointment ${newStatus.toLowerCase()} successfully!`,
        };
    } catch (error: any) {
        console.error("Error updating appointment status:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
