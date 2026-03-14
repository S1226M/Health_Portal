import { prisma } from "./lib/prisma";

async function listDoctors() {
    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });
    console.log("--- Doctors in Database ---");
    console.table(doctors);
}

listDoctors();
