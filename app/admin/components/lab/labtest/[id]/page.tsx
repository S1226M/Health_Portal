import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function LabTestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Lab Test Details" backUrl="/admin/components/lab/labtest" />
            <FormContainer onCancelUrl="/admin/components/lab/labtest">
                <FormInput label="Test Name" defaultValue="Complete Blood Count" readOnly fullWidth />
                <FormInput label="Test Code" defaultValue="CBC" readOnly />
                <FormInput label="Price" defaultValue="400.00" readOnly />
            </FormContainer>
        </div>
    );
}
