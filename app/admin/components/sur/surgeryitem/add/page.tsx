import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveSurgeryItem from '@/app/admin/modules/sur/surgeryitem/action/SaveSurgeryItem';

export default async function AddSurgeryItemPage() {
    const columns = await getColumns('sur_surgeryitem');

    const labTests = await prisma.lab_labtest.findMany({ where: { IsDeleted: false } });
    const surgeries = await prisma.sur_surgery.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        LabTestID: labTests.map(l => ({ label: l.TestName, value: l.LabTestID })),
        SurgeryID: surgeries.map(s => ({ label: s.SurgeryName, value: s.SurgeryID }))
    };

    return (
        <>
            <PageHeader
                title="Add Surgery Item"
                backUrl="/admin/components/sur/surgeryitem"
            />

            <FormContainer
                columns={columns}
                action={SaveSurgeryItem}
                onCancelUrl="/admin/components/sur/surgeryitem"
                skipFields={['SurgeryItemID']}
                selectOptions={selectOptions}
            />
        </>
    );
}
