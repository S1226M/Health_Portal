"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

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

        const appointments = await prisma.hop_appointment.findMany({
            where: {
                CreatedByUserID: currentUserId,
                IsDeleted: false,
                AppointmentDate:{
                    gt:new Date()
                }
            },
            select: {
                AppointmentID: true,
                AppointmentNo: true,
                AppointmentDate: true,  
                Status: true,
                Reason: true,
                PatientName: true,
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

        return { success: true, data: appointments };

    } catch (error: any) {
        console.error("Error fetching appointments:", error);
        return { success: false, message: "Failed to fetch appointments" };
    }
}
