import { prisma } from "./lib/prisma";
import dayjs from "dayjs";

async function verify() {
    const startOfToday = dayjs().startOf('day').toDate();
    const endOfToday = dayjs().endOf('day').toDate();

    const doctorCount = await prisma.hop_doctor.count({ where: { IsDeleted: false } });
    const patientCount = await prisma.hop_patient.count({ where: { IsDeleted: false } });
    const apptToday = await prisma.hop_appointment.count({
        where: {
            IsDeleted: false,
            AppointmentDate: { gte: startOfToday, lte: endOfToday }
        }
    });
    const labOrders = await prisma.lab_labtestorder.count({ where: { IsDeleted: false } });
    const surgeries = await prisma.sur_surgerybooking.count({ where: { IsDeleted: false } });

    console.log("--- Dashboard Data Verification ---");
    console.log(`Doctors: ${doctorCount}`);
    console.log(`Patients: ${patientCount}`);
    console.log(`Appointments Today: ${apptToday}`);
    console.log(`Lab Orders: ${labOrders}`);
    console.log(`Surgeries: ${surgeries}`);

    const recentAppts = await prisma.hop_appointment.findMany({
        where: { IsDeleted: false },
        take: 5,
        orderBy: { Created: "desc" },
        include: { hop_doctor: true }
    });
    console.log("\n--- Recent Appointments ---");
    recentAppts.forEach(a => console.log(`${dayjs(a.Created).format('YYYY-MM-DD HH:mm')} - ${a.PatientName} with Dr. ${a.hop_doctor?.DoctorName}`));
}

verify();
