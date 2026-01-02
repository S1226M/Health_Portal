import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddDoctorPage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Doctor" backUrl="/admin/components/hop/doctor" />
            <FormContainer onCancelUrl="/admin/components/hop/doctor">
                <FormInput label="Doctor Name" placeholder="Dr. Name" fullWidth />
                <FormSelect label="Specialization" options={['Cardiologist', 'Dentist', 'Neurologist']} />
                <FormSelect label="Hospital" options={['General Hospital', 'Apollo Clinic']} />
                <FormInput label="Description" placeholder="Notes..." fullWidth />
            </FormContainer>
        </div>
    );
}
