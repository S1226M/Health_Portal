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
            let currentTime = dayjs().hour(9).minute(0).second(0);
            const endTime = dayjs().hour(17).minute(0).second(0);

            while (currentTime.isBefore(endTime)) {
                slots.push({
                    StartTime: currentTime.toDate(),
                    EndTime: currentTime.add(30, "minute").toDate(),
                    SlotName: currentTime.format("HH:mm"),
                });
                currentTime = currentTime.add(30, "minute");
            }

            await prisma.hop_timeslot_master.createMany({ data: slots });
        }

        // 2. Map Slots to Doctor
        const allSlots = await prisma.hop_timeslot_master.findMany();
        let createdCount = 0;

        for (let day = 0; day <= 6; day++) {
            // Check if mappings exist for this day
            const existing = await prisma.hop_doctor_slot_mapping.findFirst({
                where: { DoctorID: doctorId, DayOfWeek: day }
            });

            if (!existing) {
                const mappings = allSlots.map(slot => ({
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
