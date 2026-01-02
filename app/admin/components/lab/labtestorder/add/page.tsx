import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddLabTestOrderPage() {
    return (
        <div className="p-6">
            <PageHeader title="New Lab Test Order" backUrl="/admin/components/lab/labtestorder" />
            <FormContainer onCancelUrl="/admin/components/lab/labtestorder">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Lab Test Type" options={['Pathology', 'Radiology']} />
                <FormSelect label="Lab Test" options={['CBC', 'Lipid Profile']} />
                <FormSelect label="Payment Status" options={['Paid', 'Unpaid']} />
            </FormContainer>
        </div>
    );
}
