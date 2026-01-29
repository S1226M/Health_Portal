"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteReceiptTran(id: number) {
    const currentUserId = 4;

    await prisma.hop_receipttran.update({
        where: { ReceiptTranID: id },
        data: {
            IsDeleted: true,
            Modified: new Date(),
            ModifiedByUserID: currentUserId
        }
    });

    const logData = {
        ReceiptTranID: id,
        IUD: "D",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_receipttran.create({ data: logData });

    revalidatePath("/admin/components/hop/receipttran");
}
