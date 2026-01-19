"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteHospitalTreatment(id: number) {

    await prisma.hop_hospitaltreatment.update({
        where: { HospitalTreatmentID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        HospitalTreatmentID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_hospitaltreatment.create({ data: deleteData });

    revalidatePath('/admin/components/hop/hospitaltreatment');
}
