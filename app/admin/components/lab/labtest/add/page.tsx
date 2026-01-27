import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import SaveLabTest from '@/app/admin/modules/lab/labtest/action/SaveLabTest';
import { getColumns } from '../../../Common/columns';

export default async function AddLabTestPage() {
    const columns = await getColumns('lab_labtest');

    return (
        <>
            <PageHeader
                title="Add Lab Test"
                backUrl="/admin/components/lab/labtest"
            />

            <FormContainer
                columns={columns}
                action={SaveLabTest}
                onCancelUrl="/admin/components/lab/labtest"
                skipFields={['LabTestID']}
            />
        </>
    );
}
