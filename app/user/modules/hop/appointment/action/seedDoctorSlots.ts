"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export async function seedDoctorSlots(doctorId: number) {
    try {
        console.log("Seeding slots for doctor:", doctorId);

        // 1. Create Time Slots (if not exist)
        const existingSlots = await prisma.hop_timeslot_master.findMany();
        if (existingSlots.length === 0) {
            console.log("Creating default time slots...");
            const slots = [];

            // Use a stable base date (1970-01-01) so MySQL TIME columns
            // receive clean values like 09:00:00, 09:30:00, etc.
            const baseDate = "1970-01-01";

            let hour = 9;
            let minute = 0;

            while (hour < 17) {
                const startH = String(hour).padStart(2, "0");
                const startM = String(minute).padStart(2, "0");

                let endMinute = minute + 30;
                let endHour = hour;
                if (endMinute >= 60) {
                    endMinute -= 60;
                    endHour += 1;
                }
                const endH = String(endHour).padStart(2, "0");
                const endM = String(endMinute).padStart(2, "0");

                slots.push({
                    StartTime: new Date(`${baseDate}T${startH}:${startM}:00.000Z`),
                    EndTime: new Date(`${baseDate}T${endH}:${endM}:00.000Z`),
                    SlotName: `${startH}:${startM}`,
                });

                // Advance by 30 minutes
                minute += 30;
                if (minute >= 60) {
                    minute -= 60;
                    hour += 1;
                }
            }

            console.log(`Creating ${slots.length} time slots...`);
            await prisma.hop_timeslot_master.createMany({ data: slots });
        }

        // 2. Map Slots to Doctor for all 7 days (0=Sun to 6=Sat)
        const allSlots = await prisma.hop_timeslot_master.findMany();
        let createdCount = 0;

        for (let day = 0; day <= 6; day++) {
            // Check if mappings exist for this day
            const existing = await prisma.hop_doctor_slot_mapping.findFirst({
                where: { DoctorID: doctorId, DayOfWeek: day }
            });

            if (!existing) {
                const mappings = allSlots.map((slot: { SlotID: number }) => ({
                    DoctorID: doctorId,
                    SlotID: slot.SlotID,
                    DayOfWeek: day,
                    IsActive: true
                }));
                await prisma.hop_doctor_slot_mapping.createMany({ data: mappings });
                createdCount += mappings.length;
            }
        }

        return { success: true, message: `Seeded successfully! Created mappings for ${createdCount} slots.` };
    } catch (error: any) {
        console.error("Seeding error:", error);
        return { success: false, message: error.message };
    }
}
