import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function LabTestOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Lab Test Order Details" backUrl="/admin/components/lab/labtestorder" />
            <FormContainer onCancelUrl="/admin/components/lab/labtestorder">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Lab Test Type" options={['Pathology']} />
                <FormSelect label="Lab Test" options={['CBC']} />
                <FormSelect label="Payment Status" options={['Paid']} />
            </FormContainer>
        </div>
    );
}
