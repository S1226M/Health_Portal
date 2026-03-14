import { prisma } from "./lib/prisma";

async function debug() {
    const masterSlots = await prisma.hop_timeslot_master.findMany();
    console.log("--- Master Slots ---");
    console.table(masterSlots.map(s => ({
        ID: s.SlotID,
        Name: s.SlotName,
        Start: s.StartTime,
        End: s.EndTime
    })));

    const mappings = await prisma.hop_doctor_slot_mapping.findMany({
        take: 10,
        include: { hop_timeslot_master: true }
    });
    console.log("\n--- Mappings (Top 10) ---");
    console.table(mappings.map(m => ({
        ID: m.MappingID,
        DocID: m.DoctorID,
        SlotID: m.SlotID,
        Day: m.DayOfWeek,
        Active: m.IsActive,
        SlotName: m.hop_timeslot_master?.SlotName
    })));
}

debug();
