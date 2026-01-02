import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Medicine Details" backUrl="/admin/components/phm/medicine" />
            <FormContainer onCancelUrl="/admin/components/phm/medicine">
                <FormInput label="Medicine Name" defaultValue="Paracetamol" readOnly fullWidth />
                <FormSelect label="Category" options={['Tablet']} />
                <FormInput label="Price" defaultValue="10.00" readOnly />
                <FormInput label="Manufacturer" defaultValue="GSK" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
