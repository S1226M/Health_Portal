"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editState(formData: FormData) {
    const rowId = formData.get('StateID');
    const stateId = parseInt(rowId as string);
    
    if (isNaN(stateId)) throw new Error("Invalid State ID");
    
    const currentUserId = 4; // Ideally get this from session/auth
    
    await prisma.loc_state.update({
        where: { StateID: stateId },
        data: {
            StateName: formData.get('StateName') as string,
            CountryID: parseInt(formData.get('CountryID') as string),
            ModifiedByUserID: currentUserId,
            Modified: new Date()
        }
    });

    // Logging the change
    await prisma.loc_log_state.create({ 
        data: {
            StateID: stateId,
            IUD: 'U',
            Created: new Date(),
            CreatedByUserID: currentUserId
        } 
    });

    revalidatePath('/admin/components/loc/state');
    redirect('/admin/components/loc/state');
}