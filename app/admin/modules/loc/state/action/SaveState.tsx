"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveState(formData: FormData) {
    const stateName = formData.get("StateName") as string;
    const countryID = formData.get("CountryID") as string;

    const currentUserId = 4;
    const data = {
        StateName: stateName,
        CountryID: parseInt(countryID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    const addedData = await prisma.loc_state.create({ data });

    const addedID = addedData.StateID;
    const newData = {
        StateID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.loc_log_state.create({ data: newData });

    revalidatePath("/admin/components/loc/state");
    redirect("/admin/components/loc/state");
}