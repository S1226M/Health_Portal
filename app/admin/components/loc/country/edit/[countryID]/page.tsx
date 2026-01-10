import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer, FormInput } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import editCountry from "@/app/admin/modules/loc/country/action/editCountry";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CountryEdit({ params }: { params: Promise<{ countryID: string }> }){
    const { countryID } = await params;
    const country = await prisma.loc_country.findUnique({
        where: {CountryID: parseInt(countryID)}
    });

    if (!country) {
        notFound();
    }

    const skipFields = ['Created', 'Modified', 'IsDeleted', 'CreatedByUserID', 'ModifiedByUserID'];
    const columns = await getColumns('loc_country');

    return(
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Country Details Edit"
                backUrl="admin/components/loc/country"
            />

        <FormContainer action={editCountry} onCancelUrl="/admin/components/loc/country">
            <input type="hidden" name="CountryID" value={country?.CountryID} />
            {columns
            .filter(col => !skipFields.includes(col.COLUMN_NAME))
            .map((col) => (
                <FormInput
                    key={col.COLUMN_NAME}
                    label={col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim()}
                    name={col.COLUMN_NAME}
                    defaultValue={(country as any)[col.COLUMN_NAME] ?? ""}
                    required={col.IS_NULLABLE === 'NO'}
                    isTextArea={col.COLUMN_NAME.toLowerCase().includes('description')}
                    fullWidth={col.COLUMN_NAME.toLowerCase().includes('description')}
                    placeholder={`Enter ${col.COLUMN_NAME}...`}
                />
            ))
            }
        </FormContainer>
        </div>
    )
}