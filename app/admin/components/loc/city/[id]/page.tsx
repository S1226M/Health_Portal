import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function CityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader
                title="City Details"
                backUrl="/admin/components/loc/city"
            />

            <FormContainer onCancelUrl="/admin/components/loc/city">
                <FormInput label="City Name" defaultValue="Pune" readOnly />
                <FormInput label="Pincode" defaultValue="411001" readOnly />
                <FormSelect label="State" options={['Maharashtra']} />
            </FormContainer>
        </div>
    );
}
