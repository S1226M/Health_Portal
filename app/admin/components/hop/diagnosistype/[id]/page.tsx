import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function DiagnosisTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Diagnosis Type Details" backUrl="/admin/components/hop/diagnosistype" />
            <FormContainer onCancelUrl="/admin/components/hop/diagnosistype">
                <FormInput label="Name" defaultValue="ICD-10" readOnly fullWidth />
                <FormInput label="Short Name" defaultValue="ICD10" readOnly />
                <FormSelect label="Hospital" options={['General Hospital']} />
            </FormContainer>
        </div>
    );
}
