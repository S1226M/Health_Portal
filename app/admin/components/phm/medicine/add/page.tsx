import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveMedicine from '@/app/admin/modules/phm/medicine/action/SaveMedicine';

export default async function AddMedicinePage() {
    const columns = await getColumns('phm_medicine');

    const categories = await prisma.phm_medicinecategory.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        MedicineCategoryID: categories.map(c => ({ label: c.CategoryName, value: c.MedicineCategoryID }))
    };

    return (
        <>
            <PageHeader
                title="Add Medicine"
                backUrl="/admin/components/phm/medicine"
            />

            <FormContainer
                columns={columns}
                action={SaveMedicine}
                onCancelUrl="/admin/components/phm/medicine"
                skipFields={['MedicineID']}
                selectOptions={selectOptions}
            />
        </>
    );
}
