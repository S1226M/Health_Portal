"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteCountry(id:number) {
    await prisma.loc_country.update({
        where: {CountryID: id},
        data: { IsDeleted: true }
    });

    const deleteData = {
        CountryID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.loc_log_country.create({ data: deleteData });

    revalidatePath('/admin/modules/loc/country');
}