import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddStatePage() {
    return (
        <div className="p-6">
            <PageHeader
                title="Add State"
                backUrl="/admin/components/loc/state"
            />

            <FormContainer onCancelUrl="/admin/components/loc/state">
                <FormInput label="State Name" placeholder="e.g. Maharashtra" />
                <FormSelect label="Country" options={['India', 'USA', 'UK']} />
            </FormContainer>
        </div>
    );
}
