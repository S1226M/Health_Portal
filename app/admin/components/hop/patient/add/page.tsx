import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddPatientPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Patient" backUrl="/admin/components/hop/patient" />
            <FormContainer onCancelUrl="/admin/components/hop/patient">
                <FormInput label="Patient Name" placeholder="Full Name" fullWidth />
                <FormInput label="Mobile No" placeholder="10-digit number" />
                <FormInput label="Age" type="number" placeholder="Years" />
                <FormSelect label="Gender" options={['Male', 'Female', 'Other']} />
                <FormSelect label="Blood Group" options={['A+', 'B+', 'O+', 'AB+']} />
                <FormInput label="Address" placeholder="Full Address" fullWidth />
            </FormContainer>
        </div>
    );
}
