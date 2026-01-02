import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Doctor Details" backUrl="/admin/components/hop/doctor" />
            <FormContainer onCancelUrl="/admin/components/hop/doctor">
                <FormInput label="Doctor Name" defaultValue="Dr. John Doe" readOnly fullWidth />
                <FormSelect label="Specialization" options={['Cardiologist']} />
                <FormSelect label="Hospital" options={['General Hospital']} />
                <FormInput label="Description" defaultValue="Senior Consultant" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
