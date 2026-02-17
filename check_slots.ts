
import { config } from "dotenv";
config();
import { prisma } from "./lib/prisma";

async function checkData() {
    console.log("Checking hop_timeslot_master...");
    const slots = await prisma.hop_timeslot_master.findMany();
    console.log(`Found ${slots.length} slots.`);
    if (slots.length > 0) {
        console.log("First slot:", slots[0]);
    }

    console.log("Checking hop_doctor_slot_mapping...");
    const mappings = await prisma.hop_doctor_slot_mapping.findMany();
    console.log(`Found ${mappings.length} mappings.`);
    if (mappings.length > 0) {
        console.log("First mapping:", mappings[0]);
    }
}

checkData()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
