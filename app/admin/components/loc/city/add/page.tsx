import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddCityPage() {
    return (
        <div className="p-6">
            <PageHeader
                title="Add City"
                backUrl="/admin/components/loc/city"
            />

            <FormContainer onCancelUrl="/admin/components/loc/city">
                <FormInput label="City Name" placeholder="e.g. Pune" />
                <FormInput label="Pincode" placeholder="e.g. 411001" />
                <FormSelect label="State" options={['Maharashtra', 'California']} />
            </FormContainer>
        </div>
    );
}
