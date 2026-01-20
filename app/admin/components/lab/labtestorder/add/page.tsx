import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveLabTestOrder from '@/app/admin/modules/lab/labtestorder/action/SaveLabTestOrder';

export default async function AddLabTestOrderPage() {
    const columns = await getColumns('lab_labtestorder');

    // Fetch relations for dropdowns
    const types = await prisma.lab_labtesttype.findMany({ where: { IsDeleted: false } });
    const patients = await prisma.hop_patient.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        LabTestTypeID: types.map(t => ({ label: t.LabTestTypeName, value: t.LabTestTypeID })),
        PatientID: patients.map(p => ({ label: p.PatientName, value: p.PatientID }))
    };

    return (
        <>
            <PageHeader
                title="Add Lab Test Order"
                backUrl="/admin/components/lab/labtestorder"
            />

            <FormContainer
                columns={columns}
                action={SaveLabTestOrder}
                onCancelUrl="/admin/components/lab/labtestorder"
                skipFields={['LabTestOrderID']}
                selectOptions={selectOptions}
            />
        </>
    );
}
