"use server";

import { prisma } from "@/lib/prisma";
import { getDoctorByUserId } from "./getDoctorByUserId";

export async function getPatientHistory() {
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

        // Group by patient name (since there's no separate PatientID on appointments)
        const patientMap = new Map<string, any[]>();
        for (const appt of appointments) {
            const key = appt.PatientName;
            if (!patientMap.has(key)) {
                patientMap.set(key, []);
            }
            patientMap.get(key)!.push({
                AppointmentID: appt.AppointmentID,
                AppointmentNo: appt.AppointmentNo,
                AppointmentDate: appt.AppointmentDate?.toISOString() || "",
                Status: appt.Status,
                Reason: appt.Reason,
                MessageFromDoctor: appt.MessageFromDoctor,
                SlotName: appt.hop_timeslot_master?.SlotName || "N/A",
                StartTime: appt.hop_timeslot_master?.StartTime?.toISOString() || "",
                EndTime: appt.hop_timeslot_master?.EndTime?.toISOString() || "",
                Created: appt.Created.toISOString(),
                IsVideoConsultant: appt.IsVideoConsultant,
                Address: appt.Address,
                City: appt.City,
                PatientAge: appt.PatientAge,
            });
        }

        const data = Array.from(patientMap.entries()).map(([name, appts]) => ({
            patientName: name,
            totalVisits: appts.length,
            lastVisit: appts[0]?.AppointmentDate || "",
            appointments: appts,
        }));

        return { success: true, message: "OK", data };
    } catch (error: any) {
        console.error("Error fetching patient history:", error);
        return { success: false, message: error.message, data: [] };
    }
}
