import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import SaveLabTestType from '@/app/admin/modules/lab/labtesttype/action/SaveLabTestType';

export default async function AddLabTestTypePage() {
    const columns = await getColumns('lab_labtesttype');

    return (
        <>
            <PageHeader
                title="Add Lab Test Type"
                backUrl="/admin/components/lab/labtesttype"
            />

            <FormContainer
                columns={columns}
                action={SaveLabTestType}
                onCancelUrl="/admin/components/lab/labtesttype"
                skipFields={['LabTestTypeID']}
            />
        </>
    );
}
