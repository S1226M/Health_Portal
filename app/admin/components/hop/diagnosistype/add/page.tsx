import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddDiagnosisTypePage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Diagnosis Type" backUrl="/admin/components/hop/diagnosistype" />
            <FormContainer onCancelUrl="/admin/components/hop/diagnosistype">
                <FormInput label="Name" placeholder="e.g. ICD-10" fullWidth />
                <FormInput label="Short Name" placeholder="e.g. ICD10" />
                <FormSelect label="Hospital" options={['General Hospital']} />
            </FormContainer>
        </div>
    );
}
