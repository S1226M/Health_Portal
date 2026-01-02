import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function OrderOfMedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Order Details" backUrl="/admin/components/phm/orderofmedicine" />
            <FormContainer onCancelUrl="/admin/components/phm/orderofmedicine">
                <FormSelect label="Medicine" options={['Paracetamol']} />
                <FormInput label="Quantity" defaultValue="10" readOnly />
                <FormSelect label="Payment Type" options={['Cash']} />
            </FormContainer>
        </div>
    );
}
