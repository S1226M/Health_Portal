import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function SurgeryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Surgery Details" backUrl="/admin/components/sur/surgery" />
            <FormContainer onCancelUrl="/admin/components/sur/surgery">
                <FormInput label="Surgery Name" defaultValue="Appendectomy" readOnly fullWidth />
                <FormInput label="Surgery Code" defaultValue="APP01" readOnly />
                <FormSelect label="Hospital" options={['General Hospital']} />
                <FormInput label="Base Price" defaultValue="15000.00" readOnly />
            </FormContainer>
        </div>
    );
}
