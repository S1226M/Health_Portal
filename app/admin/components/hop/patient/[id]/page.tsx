import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Patient Details" backUrl="/admin/components/hop/patient" />
            <FormContainer onCancelUrl="/admin/components/hop/patient">
                <FormInput label="Patient Name" defaultValue="Smit M" readOnly fullWidth />
                <FormInput label="Mobile No" defaultValue="9876543210" readOnly />
                <FormInput label="Age" defaultValue="25" readOnly />
                <FormSelect label="Gender" options={['Male']} />
                <FormSelect label="Blood Group" options={['O+']} />
                <FormInput label="Address" defaultValue="Pune, India" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
