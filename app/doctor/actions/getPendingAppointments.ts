"use server";

import { prisma } from "@/lib/prisma";
import { getDoctorByUserId } from "./getDoctorByUserId";

export async function getPendingAppointments() {
    const doctor = await getDoctorByUserId();
    if (!doctor) {
        return { success: false, message: "Unauthorized", data: [] };
    }

    try {
        const appointments = await prisma.hop_appointment.findMany({
            where: {
                DoctorID: doctor.DoctorID,
                Status: "Pending",
                IsDeleted: false,
            },
            orderBy: { Created: "desc" },
            include: {
                hop_timeslot_master: true,
            },
        });

        const data = appointments.map((a) => ({
            AppointmentID: a.AppointmentID,
            AppointmentNo: a.AppointmentNo,
            PatientName: a.PatientName,
            PatientAge: a.PatientAge,
            AppointmentDate: a.AppointmentDate?.toISOString() || "",
            Reason: a.Reason,
            Address: a.Address,
            City: a.City,
            State: a.State,
            Country: a.Country,
            Status: a.Status,
            SlotID: a.SlotID,
            SlotName: a.hop_timeslot_master?.SlotName || "N/A",
            StartTime: a.hop_timeslot_master?.StartTime?.toISOString() || "",
            EndTime: a.hop_timeslot_master?.EndTime?.toISOString() || "",
            Created: a.Created.toISOString(),
            IsVideoConsultant: a.IsVideoConsultant,
        }));

        return { success: true, message: "OK", data };
    } catch (error: any) {
        console.error("Error fetching pending appointments:", error);
        return { success: false, message: error.message, data: [] };
    }
}

export async function getAllDoctorAppointments() {
    const doctor = await getDoctorByUserId();
    if (!doctor) {
        return { success: false, message: "Unauthorized", data: [] };
    }

    try {
        const appointments = await prisma.hop_appointment.findMany({
            where: {
                DoctorID: doctor.DoctorID,
                IsDeleted: false,
            },
            orderBy: { Created: "desc" },
            include: {
                hop_timeslot_master: true,
            },
        });

        const data = appointments.map((a) => ({
            AppointmentID: a.AppointmentID,
            AppointmentNo: a.AppointmentNo,
            PatientName: a.PatientName,
            PatientAge: a.PatientAge,
            AppointmentDate: a.AppointmentDate?.toISOString() || "",
            Reason: a.Reason,
            Address: a.Address,
            City: a.City,
            State: a.State,
            Country: a.Country,
            Status: a.Status,
            MessageFromDoctor: a.MessageFromDoctor,
            SlotID: a.SlotID,
            SlotName: a.hop_timeslot_master?.SlotName || "N/A",
            StartTime: a.hop_timeslot_master?.StartTime?.toISOString() || "",
            EndTime: a.hop_timeslot_master?.EndTime?.toISOString() || "",
            Created: a.Created.toISOString(),
            IsVideoConsultant: a.IsVideoConsultant,
        }));

        return { success: true, message: "OK", data };
    } catch (error: any) {
        console.error("Error fetching all appointments:", error);
        return { success: false, message: error.message, data: [] };
    }
}
