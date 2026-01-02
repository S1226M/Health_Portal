import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddMedicinePage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Medicine" backUrl="/admin/components/phm/medicine" />
            <FormContainer onCancelUrl="/admin/components/phm/medicine">
                <FormInput label="Medicine Name" placeholder="e.g. Paracetamol" fullWidth />
                <FormSelect label="Category" options={['Tablet', 'Syrup', 'Injection']} />
                <FormInput label="Price" type="number" placeholder="0.00" />
                <FormInput label="Manufacturer" placeholder="Company Name" fullWidth />
            </FormContainer>
        </div>
    );
}
