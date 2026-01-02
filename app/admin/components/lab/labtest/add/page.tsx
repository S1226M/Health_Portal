import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddLabTestPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Lab Test" backUrl="/admin/components/lab/labtest" />
            <FormContainer onCancelUrl="/admin/components/lab/labtest">
                <FormInput label="Test Name" placeholder="e.g. CBC" fullWidth />
                <FormInput label="Test Code" placeholder="e.g. CBC" />
                <FormInput label="Price" type="number" placeholder="0.00" />
            </FormContainer>
        </div>
    );
}
