"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteState(id: number) {

    await prisma.loc_state.update({
        where: { StateID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        StateID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.loc_log_state.create({ data: deleteData });

    revalidatePath('/admin/components/loc/state');
}
