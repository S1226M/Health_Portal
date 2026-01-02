import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function CountryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // In a real app, fetch data based on params.id
    return (
        <div className="p-6">
            <PageHeader
                title="Country Details"
                backUrl="/admin/components/loc/country"
            />

            <FormContainer onCancelUrl="/admin/components/loc/country">
                <FormInput label="Country Name" defaultValue="India" readOnly />
                <FormInput label="ISO Code" defaultValue="IN" readOnly />
                <FormInput label="Phone Code" defaultValue="+91" readOnly />
            </FormContainer>
        </div>
    );
}
