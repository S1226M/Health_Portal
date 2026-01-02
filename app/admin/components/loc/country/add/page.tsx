import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddCountryPage() {
    return (
        <div className="p-6">
            <PageHeader
                title="Add Country"
                backUrl="/admin/components/loc/country"
            />

            <FormContainer onCancelUrl="/admin/components/loc/country">
                <FormInput label="Country Name" placeholder="e.g. India" />
                <FormInput label="ISO Code" placeholder="e.g. IN" />
                <FormInput label="Phone Code" placeholder="e.g. +91" />
            </FormContainer>
        </div>
    );
}
