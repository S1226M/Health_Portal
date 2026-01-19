"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteDoctor(id: number) {

    await prisma.hop_doctor.update({
        where: { DoctorID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        DoctorID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_doctor.create({ data: deleteData });

    revalidatePath('/admin/components/hop/doctor');
}
