"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editPatient(formData: FormData) {
    const patientID = formData.get("PatientID") as string;
    const patientName = formData.get("PatientName") as string;
    const patientNo = formData.get("PatientNo") as string;
    const registrationDateTime = formData.get("RegistrationDateTime") as string;
    const age = formData.get("Age") as string;
    const bloodGroup = formData.get("BloodGroup") as string;
    const gender = formData.get("Gender") as string;
    const cityID = formData.get("CityID") as string;
    const mobileNo = formData.get("MobileNo") as string;
    const address = formData.get("Address") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const id = parseInt(patientID);

    await prisma.hop_patient.update({
        where: { PatientID: id },
        data: {
            PatientName: patientName,
            PatientNo: parseInt(patientNo),
            RegistrationDateTime: new Date(registrationDateTime),
            Age: age ? parseInt(age) : null,
            BloodGroup: bloodGroup,
            Gender: gender,
            CityID: cityID ? parseInt(cityID) : null,
            MobileNo: mobileNo,
            Address: address,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        PatientID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_patient.create({ data: editData });

    revalidatePath("/admin/components/hop/patient");
    redirect("/admin/components/hop/patient");
}
