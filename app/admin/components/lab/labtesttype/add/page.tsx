import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddLabTestTypePage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Lab Test Type" backUrl="/admin/components/lab/labtesttype" />
            <FormContainer onCancelUrl="/admin/components/lab/labtesttype">
                <FormInput label="Type Name" placeholder="e.g. Pathology" fullWidth />
            </FormContainer>
        </div>
    );
}
