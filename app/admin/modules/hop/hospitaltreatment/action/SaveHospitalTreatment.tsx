"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveHospitalTreatment(formData: FormData) {
    const hospitalID = formData.get("HospitalID") as string;
    const treatmentTypeID = formData.get("TreatmentTypeID") as string;

    // Note: This table doesn't have Created/CreatedByUserID in schema but has HospitalTreatmentID
    // Checking schema again: line 145.
    // HospitalTreatmentID, HospitalID, TreatmentTypeID, IsDeleted.
    // It DOES NOT have Created/Modified fields.

    // But typical pattern requires logging. 
    // And log table requires CreatedByUserID (line 205).
    // The main table doesn't have it.

    const data = {
        HospitalID: parseInt(hospitalID),
        TreatmentTypeID: parseInt(treatmentTypeID),
        IsDeleted: false,
    };

    const addedData = await prisma.hop_hospitaltreatment.create({ data });

    const addedID = addedData.HospitalTreatmentID;
    const newData = {
        HospitalTreatmentID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: 4, // Hardcoded as per pattern
    };
    await prisma.hop_log_hospitaltreatment.create({ data: newData });

    revalidatePath("/admin/components/hop/hospitaltreatment");
    redirect("/admin/components/hop/hospitaltreatment");
}
