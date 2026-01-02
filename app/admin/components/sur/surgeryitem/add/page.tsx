import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddSurgeryItemPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Surgery Item" backUrl="/admin/components/sur/surgeryitem" />
            <FormContainer onCancelUrl="/admin/components/sur/surgeryitem">
                <FormSelect label="Item Type" options={['Medicine', 'Lab Test', 'Other']} />
                <FormInput label="Quantity" type="number" defaultValue="1" />
                <FormInput label="Amount" type="number" placeholder="0.00" />
                <FormInput label="Description" placeholder="Item description" fullWidth />
            </FormContainer>
        </div>
    );
}
