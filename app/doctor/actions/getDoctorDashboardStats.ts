"use server";

import { prisma } from "@/lib/prisma";
import { getDoctorByUserId } from "./getDoctorByUserId";
import dayjs from "dayjs";

export async function getDoctorDashboardStats() {
    const doctor = await getDoctorByUserId();
    if (!doctor) {
        return {
            totalAppointments: 0,
            pendingCount: 0,
            approvedCount: 0,
            rejectedCount: 0,
            completedCount: 0,
            todayCount: 0,
            recentPending: [] as any[],
        };
    }

    const base = { DoctorID: doctor.DoctorID, IsDeleted: false };
    const startOfToday = dayjs().startOf("day").toDate();
    const endOfToday = dayjs().endOf("day").toDate();

    const [totalAppointments, pendingCount, approvedCount, rejectedCount, completedCount, todayCount, recentPending] =
        await Promise.all([
            prisma.hop_appointment.count({ where: base }),
            prisma.hop_appointment.count({ where: { ...base, Status: "Pending" } }),
            prisma.hop_appointment.count({ where: { ...base, Status: "Approved" } }),
            prisma.hop_appointment.count({ where: { ...base, Status: "Rejected" } }),
            prisma.hop_appointment.count({ where: { ...base, Status: "Completed" } }),
            prisma.hop_appointment.count({
                where: {
                    ...base,
                    AppointmentDate: { gte: startOfToday, lte: endOfToday },
                },
            }),
            prisma.hop_appointment.findMany({
                where: { ...base, Status: "Pending" },
                take: 5,
                orderBy: { Created: "desc" },
                include: {
                    hop_timeslot_master: true,
                },
            }),
        ]);

    return {
        totalAppointments,
        pendingCount,
        approvedCount,
        rejectedCount,
        completedCount,
        todayCount,
        recentPending: recentPending.map((a) => ({
            AppointmentID: a.AppointmentID,
            AppointmentNo: a.AppointmentNo,
            PatientName: a.PatientName,
            AppointmentDate: a.AppointmentDate?.toISOString() || "",
            Reason: a.Reason,
            SlotName: a.hop_timeslot_master?.SlotName || "N/A",
            Created: a.Created.toISOString(),
        })),
    };
}
