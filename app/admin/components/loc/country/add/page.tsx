import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { SaveCountry } from '@/app/admin/modules/loc/country/action/SaveCountry';

export default async function AddCountryPage() {
    const columns = await getColumns('loc_country');
    const skipFields = ['CountryID', 'Created', 'Modified', 'IsDeleted', 'CreatedByUserID', 'ModifiedByUserID'];
    return (
        <div className="p-6">
            <PageHeader
                title="Add Country"
                backUrl="/admin/components/loc/country"
            />
            <FormContainer action={SaveCountry} onCancelUrl="/admin/components/loc/country">
                {columns
                    .filter(col => !skipFields.includes(col.COLUMN_NAME))
                    .map((col) => (
                        <FormInput
                            key={col.COLUMN_NAME}
                            label={col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim()}
                            name={col.COLUMN_NAME}
                            required={col.IS_NULLABLE === 'NO'}
                            isTextArea={col.COLUMN_NAME.toLowerCase().includes('description')}
                            fullWidth={col.COLUMN_NAME.toLowerCase().includes('description')}
                            placeholder={`Enter ${col.COLUMN_NAME}...`}
                        />
                    ))
                }
            </FormContainer>
        </div>
    );
}
