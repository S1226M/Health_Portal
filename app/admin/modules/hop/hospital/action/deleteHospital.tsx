"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteHospital(id: number) {

    await prisma.hop_hospital.update({
        where: { HospitalID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        HospitalID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_hospital.create({ data: deleteData });

    revalidatePath('/admin/components/hop/hospital');
}
