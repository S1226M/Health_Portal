import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddAppointmentPage() {
    return (
        <div className="p-6">
            <PageHeader title="New Appointment" backUrl="/admin/components/hop/appointment" />
            <FormContainer onCancelUrl="/admin/components/hop/appointment">
                <FormSelect label="Doctor" options={['Dr. John Doe', 'Dr. Jane Smith']} />
                <FormSelect label="Patient" options={['Smit M', 'Alice Brown']} />
                <FormInput label="Appointment Date" type="datetime-local" />
                <FormSelect label="Status" options={['Confirmed', 'Pending', 'Cancelled']} />
                <FormInput label="Reason" placeholder="Reason for visit" fullWidth />
            </FormContainer>
        </div>
    );
}
