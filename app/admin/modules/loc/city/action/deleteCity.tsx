"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteCity(id: number) {

    await prisma.loc_city.update({
        where: { CityID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        CityID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.loc_log_city.create({ data: deleteData });

    revalidatePath('/admin/components/loc/city');
}
