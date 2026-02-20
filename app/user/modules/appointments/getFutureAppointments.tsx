// app/actions/getFutureAppointments.ts
"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getFutureAppointments() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { count: 0, appointments: [] };
    }

    const decoded = verifyToken(token) as { UserID?: number };
    const currentUserId = decoded?.UserID;

    if (!currentUserId) {
      return { count: 0, appointments: [] };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const appointments = await prisma.hop_appointment.findMany({
      where: {
        CreatedByUserID: currentUserId,
        IsDeleted: false,
        AppointmentDate: {
          gt: today,
        },
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
                SpecializationName: true,
              },
            },
            hop_hospital: {
              select: {
                HospitalName: true,
                Address: true,
              },
            },
          },
        },
        hop_timeslot_master: {
          select: {
            StartTime: true,
            EndTime: true,
            SlotName: true,
          },
        },
      },
      orderBy: {
        AppointmentDate: "asc",
      },
    });

    return {
      count: appointments.length,
      appointments,
    };
  } catch (error: any) {
    console.error("Error fetching future appointments:", error);
    return { count: 0, appointments: [] };
  }
}