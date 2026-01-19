"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deletePatient(id: number) {

    await prisma.hop_patient.update({
        where: { PatientID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        PatientID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_patient.create({ data: deleteData });

    revalidatePath('/admin/components/hop/patient');
}
