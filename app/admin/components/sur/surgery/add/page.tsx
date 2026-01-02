import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddSurgeryPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Surgery" backUrl="/admin/components/sur/surgery" />
            <FormContainer onCancelUrl="/admin/components/sur/surgery">
                <FormInput label="Surgery Name" placeholder="e.g. Cataract" fullWidth />
                <FormInput label="Surgery Code" placeholder="e.g. CAT01" />
                <FormSelect label="Hospital" options={['General Hospital']} />
                <FormInput label="Base Price" type="number" placeholder="0.00" />
            </FormContainer>
        </div>
    );
}
