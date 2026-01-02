import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Hospital Details" backUrl="/admin/components/hop/hospital" />
            <FormContainer onCancelUrl="/admin/components/hop/hospital">
                <FormInput label="Hospital Name" defaultValue="General Hospital" readOnly fullWidth />
                <FormInput label="Registration Charge" defaultValue="500.00" readOnly />
                <FormInput label="Payment Mode" defaultValue="Cash" readOnly />
                <FormInput label="Address" defaultValue="123 Main St" readOnly fullWidth />
                <FormSelect label="City" options={['Pune']} />
            </FormContainer>
        </div>
    );
}
