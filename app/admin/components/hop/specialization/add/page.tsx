import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddSpecializationPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Specialization" backUrl="/admin/components/hop/specialization" />
            <FormContainer onCancelUrl="/admin/components/hop/specialization">
                <FormInput label="Name" placeholder="e.g. Cardiology" fullWidth />
                <FormInput label="Description" placeholder="Optional description" fullWidth />
            </FormContainer>
        </div>
    );
}
