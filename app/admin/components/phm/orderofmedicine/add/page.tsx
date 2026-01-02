import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddOrderOfMedicinePage() {
    return (
        <div className="p-6">
            <PageHeader title="New Medicine Order" backUrl="/admin/components/phm/orderofmedicine" />
            <FormContainer onCancelUrl="/admin/components/phm/orderofmedicine">
                <FormSelect label="Medicine" options={['Paracetamol']} />
                <FormInput label="Quantity" type="number" defaultValue="1" />
                <FormSelect label="Payment Type" options={['Cash', 'Card']} />
            </FormContainer>
        </div>
    );
}
