import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function SurgeryItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Surgery Item Details" backUrl="/admin/components/sur/surgeryitem" />
            <FormContainer onCancelUrl="/admin/components/sur/surgeryitem">
                <FormSelect label="Item Type" options={['Medicine']} />
                <FormInput label="Quantity" defaultValue="5" readOnly />
                <FormInput label="Amount" defaultValue="500.00" readOnly />
                <FormInput label="Description" defaultValue="Generic Cotton Roll" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
