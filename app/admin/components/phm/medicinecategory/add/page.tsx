import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import SaveMedicineCategory from '@/app/admin/modules/phm/medicinecategory/action/SaveMedicineCategory';

export default async function AddMedicineCategoryPage() {
    const columns = await getColumns('phm_medicinecategory');

    return (
        <>
            <PageHeader
                title="Add Medicine Category"
                backUrl="/admin/components/phm/medicinecategory"
            />

            <FormContainer
                columns={columns}
                action={SaveMedicineCategory}
                onCancelUrl="/admin/components/phm/medicinecategory"
                skipFields={['MedicineCategoryID']}
            />
        </>
    );
}
