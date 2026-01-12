import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import editStateAction from "@/app/admin/modules/loc/state/action/editState";

export default async function editState({ params }: { params: Promise<{ stateID: string }> }) {
    const { stateID } = await params;
    const state = await prisma.loc_state.findUnique({
        where: { StateID: parseInt(stateID) }
    });

    if (!state) notFound();

    const columns = await getColumns('loc_state');

    const countries = await prisma.loc_country.findMany({
        where: { IsDeleted: false },
        select: { CountryID: true, CountryName: true }
    });

    // Format for the Generic Dropdown
    const countryOptions = countries.map(c => ({
        label: c.CountryName,
        value: c.CountryID
    }));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="State Details Edit"
                backUrl="/admin/components/loc/state"
            />

            <FormContainer
                action={editStateAction}
                onCancelUrl="/admin/components/loc/state"
                columns={columns}
                skipFields={['StateID']}
                selectOptions={{ CountryID: countryOptions }}
                initialData={state}
            >
                <input type="hidden" name="StateID" value={state?.StateID} />
            </FormContainer>
        </div>
    )
}