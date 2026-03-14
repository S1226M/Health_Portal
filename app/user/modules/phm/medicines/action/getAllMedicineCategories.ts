"use server";

import { prisma } from "@/lib/prisma";

export async function getAllMedicineCategories() {
    const data = await prisma.phm_medicinecategory.findMany({
        where: {
            IsDeleted: false,
        },
        orderBy: {
            CategoryName: 'asc',
        },
    });

    return JSON.parse(JSON.stringify(data));
}
