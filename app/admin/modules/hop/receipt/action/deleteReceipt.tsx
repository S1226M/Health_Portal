"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteReceipt(id: number) {
    const currentUserId = 4;

    await prisma.hop_receipt.update({
        where: { ReceiptID: id },
        data: {
            IsDeleted: true,
            Modified: new Date(),
            ModifiedByUserID: currentUserId
        }
    });

    const logData = {
        ReceiptID: id,
        IUD: "D",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_receipt.create({ data: logData });

    revalidatePath("/admin/components/hop/receipt");
}
