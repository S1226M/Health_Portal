import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddTreatmentTypePage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Treatment Type" backUrl="/admin/components/hop/treatmenttype" />
            <FormContainer onCancelUrl="/admin/components/hop/treatmenttype">
                <FormInput label="Name" placeholder="e.g. Consultation" fullWidth />
                <FormInput label="Short Name" placeholder="e.g. CONS" />
                <FormInput label="Description" placeholder="Optional description" fullWidth />
            </FormContainer>
        </div>
    );
}
