import SaveState from "@/app/admin/modules/loc/state/action/SaveState";
import { getColumns } from "../../../Common/columns";
import { FormContainer } from "../../../Common/Form";
import { PageHeader } from "../../../Common/PageHeader";
import { prisma } from "@/lib/prisma";

export default async function AddStatePage() {
    const columns = await getColumns('loc_state');

    // Fetch only active countries (IsDeleted is false)
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
        <>
        <PageHeader 
            title="Add State" 
            backUrl="/admin/components/loc/state" 
        />
        <FormContainer 
            columns={columns}
            action={SaveState}
            onCancelUrl="/admin/components/loc/state"
            skipFields={['StateID']}
            selectOptions={{
                CountryID: countryOptions
            }}
        />
        </>
    );
}