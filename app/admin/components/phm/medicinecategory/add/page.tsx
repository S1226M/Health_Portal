import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddMedicineCategoryPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Category" backUrl="/admin/components/phm/medicinecategory" />
            <FormContainer onCancelUrl="/admin/components/phm/medicinecategory">
                <FormInput label="Category Name" placeholder="e.g. Tablet" fullWidth />
            </FormContainer>
        </div>
    );
}
