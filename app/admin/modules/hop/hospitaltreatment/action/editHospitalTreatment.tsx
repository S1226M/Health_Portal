"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editHospitalTreatment(formData: FormData) {
    const hospitalTreatmentID = formData.get("HospitalTreatmentID") as string;
    const hospitalID = formData.get("HospitalID") as string;
    const treatmentTypeID = formData.get("TreatmentTypeID") as string;

    const id = parseInt(hospitalTreatmentID);

    await prisma.hop_hospitaltreatment.update({
        where: { HospitalTreatmentID: id },
        data: {
            HospitalID: parseInt(hospitalID),
            TreatmentTypeID: parseInt(treatmentTypeID),
        },
    });

    const editData = {
        HospitalTreatmentID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: 4,
    };

    await prisma.hop_log_hospitaltreatment.create({ data: editData });

    revalidatePath("/admin/components/hop/hospitaltreatment");
    redirect("/admin/components/hop/hospitaltreatment");
}
