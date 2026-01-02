import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Appointment Details" backUrl="/admin/components/hop/appointment" />
            <FormContainer onCancelUrl="/admin/components/hop/appointment">
                <FormSelect label="Doctor" options={['Dr. John Doe']} />
                <FormSelect label="Patient" options={['Smit M']} />
                <FormInput label="Appointment Date" defaultValue="2025-12-30T10:00" readOnly />
                <FormSelect label="Status" options={['Confirmed']} />
                <FormInput label="Reason" defaultValue="Routine Checkup" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
