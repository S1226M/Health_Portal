import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function LabTestTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Lab Test Type Details" backUrl="/admin/components/lab/labtesttype" />
            <FormContainer onCancelUrl="/admin/components/lab/labtesttype">
                <FormInput label="Type Name" defaultValue="Pathology" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
