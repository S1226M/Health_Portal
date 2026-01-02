import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddOPDPage() {
    return (
        <div className="p-6">
            <PageHeader title="New OPD Entry" backUrl="/admin/components/hop/opd" />
            <FormContainer onCancelUrl="/admin/components/hop/opd">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Doctor" options={['Dr. John Doe']} />
                <FormInput label="Registration Fee" type="number" defaultValue="500" />
                <FormInput label="Diagnosis/Reason" placeholder="Symptoms..." fullWidth />
            </FormContainer>
        </div>
    );
}
