"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteOPD(id: number) {

    await prisma.hop_opd.update({
        where: { OPDID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        OPDID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_opd.create({ data: deleteData });

    revalidatePath('/admin/components/hop/opd');
}
