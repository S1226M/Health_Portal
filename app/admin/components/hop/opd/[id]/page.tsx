import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function OPDDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="OPD Details" backUrl="/admin/components/hop/opd" />
            <FormContainer onCancelUrl="/admin/components/hop/opd">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Doctor" options={['Dr. John Doe']} />
                <FormInput label="Registration Fee" defaultValue="500" readOnly />
                <FormInput label="Diagnosis/Reason" defaultValue="Viral Fever" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
