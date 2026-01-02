import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default function AddSurgeryBookingPage() {
    return (
        <div className="p-6">
            <PageHeader title="New Surgery Booking" backUrl="/admin/components/sur/surgerybooking" />
            <FormContainer onCancelUrl="/admin/components/sur/surgerybooking">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Surgery" options={['Appendectomy']} />
                <FormSelect label="Primary Doctor" options={['Dr. John Doe']} />
                <FormSelect label="Hospital" options={['General Hospital']} />
                <FormInput label="Surgery Date" type="datetime-local" />
                <FormSelect label="Status" options={['Scheduled', 'Completed']} />
            </FormContainer>
        </div>
    );
}
