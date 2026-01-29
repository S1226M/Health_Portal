"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditReceipt(formData: FormData) {
    const receiptID = parseInt(formData.get("ReceiptID") as string);
    const ReceiptNo = formData.get("ReceiptNo") as string;
    const ReceiptDate = formData.get("ReceiptDate") as string;
    const AmountPaid = formData.get("AmountPaid") as string;
    const OPDID = parseInt(formData.get("OPDID") as string);
    const PaymentModeID = parseInt(formData.get("PaymentModeID") as string);
    const ReferenceNo = formData.get("ReferenceNo") as string;
    const Description = formData.get("Description") as string;

    const currentUserId = 4;

    const data = {
        ReceiptNo,
        ReceiptDate: new Date(ReceiptDate),
        AmountPaid: parseFloat(AmountPaid),
        OPDID,
        PaymentModeID,
        ReferenceNo,
        Description,
        Modified: new Date(),
        ModifiedByUserID: currentUserId,
    };

    await prisma.hop_receipt.update({
        where: { ReceiptID: receiptID },
        data: data
    });

    const logData = {
        ReceiptID: receiptID,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_receipt.create({ data: logData });

    revalidatePath("/admin/components/hop/receipt");
    redirect("/admin/components/hop/receipt");
}
