import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function StateDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader
                title="State Details"
                backUrl="/admin/components/loc/state"
            />

            <FormContainer onCancelUrl="/admin/components/loc/state">
                <FormInput label="State Name" defaultValue="Maharashtra" readOnly />
                <FormSelect label="Country" options={['India']} />
            </FormContainer>
        </div>
    );
}
