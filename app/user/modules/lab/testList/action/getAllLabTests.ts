"use server";

import { prisma } from "@/lib/prisma";

export async function getAllLabTests() {
    const data = await prisma.lab_labtest.findMany({
        where: {
            IsDeleted: false,
        },
        orderBy: {
            TestName: "asc",
        },
    });
    return JSON.parse(JSON.stringify(data));
}
