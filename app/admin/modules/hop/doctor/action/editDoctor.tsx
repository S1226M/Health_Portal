"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editDoctor(formData: FormData) {
    const doctorID = formData.get("DoctorID") as string;
    const doctorName = formData.get("DoctorName") as string;
    const hospitalID = formData.get("HospitalID") as string;
    const specializationID = formData.get("SpecializationID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const id = parseInt(doctorID);

    await prisma.hop_doctor.update({
        where: { DoctorID: id },
        data: {
            DoctorName: doctorName,
            HospitalID: parseInt(hospitalID),
            SpecializationID: specializationID ? parseInt(specializationID) : null,
            Description: description,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        DoctorID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_doctor.create({ data: editData });

    revalidatePath("/admin/components/hop/doctor");
    redirect("/admin/components/hop/doctor");
}
