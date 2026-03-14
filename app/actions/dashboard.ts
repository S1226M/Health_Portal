"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export async function getDashboardStats() {
    try {
        const startOfToday = dayjs().startOf('day').toDate();
        const endOfToday = dayjs().endOf('day').toDate();

        const [doctorCount, patientCount, appointmentTodayCount, labOrderCount, surgeryCount] = await Promise.all([
            prisma.hop_doctor.count({
                where: { IsDeleted: false },
            }),
            prisma.hop_patient.count({
                where: { IsDeleted: false },
            }),
            prisma.hop_appointment.count({
                where: {
                    IsDeleted: false,
                    AppointmentDate: {
                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
            }),
            prisma.lab_labtestorder.count({
                where: { IsDeleted: false },
            }),
            prisma.sur_surgerybooking.count({
                where: { IsDeleted: false },
            }),
        ]);

        return {
            doctorCount,
            patientCount,
            appointmentTodayCount,
            labOrderCount,
            surgeryCount,
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
            doctorCount: 0,
            patientCount: 0,
            appointmentTodayCount: 0,
            labOrderCount: 0,
            surgeryCount: 0,
        };
    }
}

export async function getRecentAppointments() {
    try {
        const appointments = await prisma.hop_appointment.findMany({
            where: { IsDeleted: false },
            take: 5,
            orderBy: {
                Created: "desc",
            },
            include: {
                hop_doctor: true,
            },
        });

        return appointments.map((appt) => ({
            id: appt.AppointmentID,
            patientName: appt.PatientName,
            doctorName: appt.hop_doctor?.DoctorName || "N/A",
            specialization: "General",
            time: appt.AppointmentDate ? dayjs(appt.AppointmentDate).format('hh:mm A') : "N/A",
            initials: appt.PatientName?.charAt(0) || "P",
        }));
    } catch (error) {
        console.error("Error fetching recent appointments:", error);
        return [];
    }
}

export async function getUpcomingSurgeries() {
    try {
        const surgeries = await prisma.sur_surgerybooking.findMany({
            where: {
                IsDeleted: false,
                SurgeryDateTime: {
                    gte: new Date(),
                },
            },
            take: 5,
            orderBy: {
                SurgeryDateTime: "asc",
            },
            include: {
                sur_surgery: true,
                hop_patient: true,
            },
        });

        return surgeries.map((s) => ({
            id: s.SurgeryBookingID,
            patientName: s.hop_patient.PatientName,
            surgeryName: s.sur_surgery.SurgeryName,
            dateTime: s.SurgeryDateTime ? dayjs(s.SurgeryDateTime).format('MMM DD, hh:mm A') : "TBD",
        }));
    } catch (error) {
        console.error("Error fetching upcoming surgeries:", error);
        return [];
    }
}
