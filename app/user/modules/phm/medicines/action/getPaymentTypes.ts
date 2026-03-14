"use server";

import { prisma } from "@/lib/prisma";

export async function getPaymentTypes() {
    const data = await prisma.phm_medicineorderpaymenttype.findMany({
        where: {
            IsDeleted: false,
        },
        orderBy: {
            MedicineOrderPaymentTypeName: 'asc',
        },
    });

    return JSON.parse(JSON.stringify(data));
}
