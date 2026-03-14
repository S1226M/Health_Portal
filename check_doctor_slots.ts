import { prisma } from "./lib/prisma";

async function checkAndSeed() {
    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    console.log(`Found ${doctors.length} doctors.`);

    for (const doctor of doctors) {
        const slotCount = await prisma.hop_doctor_slot_mapping.count({
            where: { DoctorID: doctor.DoctorID }
        });

        console.log(`Doctor: ${doctor.DoctorName} (ID: ${doctor.DoctorID}) has ${slotCount} slots.`);

        if (slotCount === 0) {
            console.log(`Seeding slots for ${doctor.DoctorName}...`);
            // We can't easily call the server action from here without setup, but we can do it via a simple command or just use this info to verify the fix works.
        }
    }
}

checkAndSeed();
