"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editDoctorReview(formData: FormData) {
    const doctorReviewID = formData.get("DoctorReviewID") as string;
    const doctorID = formData.get("DoctorID") as string;
    const patientID = formData.get("PatientID") as string;
    const rating = formData.get("Rating") as string;
    const reviewText = formData.get("ReviewText") as string;

    const currentUserId = 4;
    const id = parseInt(doctorReviewID);

    await prisma.hop_doctorreview.update({
        where: { DoctorReviewID: id },
        data: {
            DoctorID: parseInt(doctorID),
            PatientID: parseInt(patientID),
            Rating: parseInt(rating),
            ReviewText: reviewText,
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        DoctorReviewID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_doctorreview.create({ data: editData });

    revalidatePath("/admin/components/hop/doctorreview");
    redirect("/admin/components/hop/doctorreview");
}
