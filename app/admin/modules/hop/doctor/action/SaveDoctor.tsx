"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveDoctor(formData: FormData) {
    const doctorName = formData.get("DoctorName") as string;
    const hospitalID = formData.get("HospitalID") as string;
    const specializationID = formData.get("SpecializationID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const data = {
        DoctorName: doctorName,
        HospitalID: parseInt(hospitalID),
        SpecializationID: specializationID ? parseInt(specializationID) : null,
        Description: description,
        UserID: parseInt(userID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_doctor.create({ data });

    const addedID = addedData.DoctorID;
    const newData = {
        DoctorID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_doctor.create({ data: newData });

    revalidatePath("/admin/components/hop/doctor");
    redirect("/admin/components/hop/doctor");
}
