import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function TreatmentTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Treatment Type Details" backUrl="/admin/components/hop/treatmenttype" />
            <FormContainer onCancelUrl="/admin/components/hop/treatmenttype">
                <FormInput label="Name" defaultValue="Consultation" readOnly fullWidth />
                <FormInput label="Short Name" defaultValue="CONS" readOnly />
                <FormInput label="Description" defaultValue="General OPD Consultation" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
