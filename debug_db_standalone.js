const { PrismaClient } = require("./lib/generated/prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
require('dotenv').config();

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectionLimit: 1
});

const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const doctors = await prisma.hop_doctor.findMany({
            where: { IsDeleted: false },
            select: { DoctorID: true, DoctorName: true }
        });
        console.log("--- Doctor List (Actual IDs in DB) ---");
        console.table(doctors);

        const slotCount = await prisma.hop_timeslot_master.count();
        console.log(`\nTotal Master Slots: ${slotCount}`);

        const mappingCount = await prisma.hop_doctor_slot_mapping.count();
        console.log(`Total Slot Mappings: ${mappingCount}`);

        if (doctors.length > 0) {
            const firstDoc = doctors[0];
            const sampleMappings = await prisma.hop_doctor_slot_mapping.findMany({
                where: { DoctorID: firstDoc.DoctorID },
                take: 5
            });
            console.log(`\nSample Mappings for Doctor ${firstDoc.DoctorName} (ID: ${firstDoc.DoctorID}):`);
            console.table(sampleMappings);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
