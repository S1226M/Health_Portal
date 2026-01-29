"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveReceiptTran(formData: FormData) {
    const ReceiptID = parseInt(formData.get("ReceiptID") as string);
    const SubTreatmentTypeID = formData.get("SubTreatmentTypeID") ? parseInt(formData.get("SubTreatmentTypeID") as string) : null;
    const MedicineID = formData.get("MedicineID") ? parseInt(formData.get("MedicineID") as string) : null;
    const LabTestID = formData.get("LabTestID") ? parseInt(formData.get("LabTestID") as string) : null;
    const AmountTotal = formData.get("AmountTotal") as string;
    const Description = formData.get("Description") as string;

    const currentUserId = 4;

    const data = {
        ReceiptID,
        SubTreatmentTypeID,
        MedicineID,
        LabTestID,
        AmountTotal: parseFloat(AmountTotal),
        Description,
        UserID: currentUserId,
        Created: new Date(),
        Modified: new Date(),
        CreatedByUserID: currentUserId,
        IsDeleted: false,
    };

    const addedData = await prisma.hop_receipttran.create({ data });
    const addedID = addedData.ReceiptTranID;

    const logData = {
        ReceiptTranID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_receipttran.create({ data: logData });

    revalidatePath("/admin/components/hop/receipttran");
    redirect("/admin/components/hop/receipttran");
}
