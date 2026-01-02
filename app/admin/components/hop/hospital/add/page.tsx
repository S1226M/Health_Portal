import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddHospitalPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Hospital" backUrl="/admin/components/hop/hospital" />
            <FormContainer onCancelUrl="/admin/components/hop/hospital">
                <FormInput label="Hospital Name" placeholder="e.g. Apollo Clinic" fullWidth />
                <FormInput label="Registration Charge" type="number" placeholder="0.00" />
                <FormInput label="Payment Mode" placeholder="Select Mode" />
                <FormInput label="Address" placeholder="Street Address" fullWidth />
                <FormSelect label="City" options={['Pune', 'Mumbai', 'Delhi']} />
            </FormContainer>
        </div>
    );
}
