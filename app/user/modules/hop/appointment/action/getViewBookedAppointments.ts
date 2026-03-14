"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { releaseExpiredSlots } from "./releaseExpiredSlots";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function getViewBookedAppointments() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized" };
        }

        const decoded = verifyToken(token) as { UserID?: number };
        const currentUserId = decoded?.UserID;

        if (!currentUserId) {
            return { success: false, message: "Invalid token" };
        }

        // Release expired slots before fetching appointments
        await releaseExpiredSlots();

        const now = new Date();

        // Fetch ALL appointments (both upcoming and past)
        const appointments = await prisma.hop_appointment.findMany({
            where: {
                OR: [
                    { UserID: currentUserId },
                    { CreatedByUserID: currentUserId },
                ],
                IsDeleted: false,
            },
            select: {
                AppointmentID: true,
                AppointmentNo: true,
                AppointmentDate: true,
                Status: true,
                Reason: true,
                PatientName: true,
                SlotID: true,
                DoctorID: true,
                hop_doctor: {
                    select: {
                        DoctorName: true,
                        hop_specialization: {
                            select: {
                                SpecializationName: true
                            }
                        },
                        hop_hospital: {
                            select: {
                                HospitalName: true,
                                Address: true
                            }
                        }
                    }
                },
                hop_timeslot_master: {
                    select: {
                        StartTime: true,
                        EndTime: true,
                        SlotName: true
                    }
                }
            },
            orderBy: {
                AppointmentDate: 'desc'
            }
        });

        // Add an "appointmentStatus" field: "Upcoming" or "Completed"
        const enrichedAppointments = appointments.map((appt) => {
            const apptDate = appt.AppointmentDate ? new Date(appt.AppointmentDate) : null;
            let appointmentStatus = "Upcoming";

            if (appt.Status === "Cancelled") {
                appointmentStatus = "Cancelled";
            } else if (appt.Status === "Completed") {
                appointmentStatus = "Completed";
            } else if (apptDate && apptDate < now) {
                appointmentStatus = "Completed";
            }

            // Format timeslot times in UTC to avoid timezone shift
            const formattedTimeslot = appt.hop_timeslot_master ? {
                StartTime: dayjs.utc(appt.hop_timeslot_master.StartTime).format("hh:mm A"),
                EndTime: dayjs.utc(appt.hop_timeslot_master.EndTime).format("hh:mm A"),
                SlotName: appt.hop_timeslot_master.SlotName,
            } : null;

            return {
                ...appt,
                appointmentStatus,
                hop_timeslot_master: formattedTimeslot,
            };
        });

        return { success: true, data: enrichedAppointments };

    } catch (error: any) {
        console.error("Error fetching appointments:", error);
        return { success: false, message: "Failed to fetch appointments" };
    }
}
