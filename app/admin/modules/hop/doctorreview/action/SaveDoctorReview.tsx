"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveDoctorReview(formData: FormData) {
    const doctorID = formData.get("DoctorID") as string;
    const patientID = formData.get("PatientID") as string;
    const rating = formData.get("Rating") as string;
    const reviewText = formData.get("ReviewText") as string;

    const currentUserId = 4;
    const data = {
        DoctorID: parseInt(doctorID),
        PatientID: parseInt(patientID),
        Rating: parseInt(rating),
        ReviewText: reviewText,
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_doctorreview.create({ data });

    const addedID = addedData.DoctorReviewID;
    const newData = {
        DoctorReviewID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_doctorreview.create({ data: newData });

    revalidatePath("/admin/components/hop/doctorreview");
    redirect("/admin/components/hop/doctorreview");
}
