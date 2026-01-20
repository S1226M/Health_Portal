import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import SaveSurgery from '@/app/admin/modules/sur/surgery/action/SaveSurgery';

export default async function AddSurgeryPage() {
    const columns = await getColumns('sur_surgery');

    return (
        <>
            <PageHeader
                title="Add Surgery"
                backUrl="/admin/components/sur/surgery"
            />

            <FormContainer
                columns={columns}
                action={SaveSurgery}
                onCancelUrl="/admin/components/sur/surgery"
                skipFields={['SurgeryID']}
            />
        </>
    );
}
