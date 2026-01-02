import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function MedicineCategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Category Details" backUrl="/admin/components/phm/medicinecategory" />
            <FormContainer onCancelUrl="/admin/components/phm/medicinecategory">
                <FormInput label="Category Name" defaultValue="Tablet" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
