import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput, FormSelect } from '@/app/admin/components/Common/Form';

export default async function SurgeryBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Booking Details" backUrl="/admin/components/sur/surgerybooking" />
            <FormContainer onCancelUrl="/admin/components/sur/surgerybooking">
                <FormSelect label="Patient" options={['Smit M']} />
                <FormSelect label="Surgery" options={['Appendectomy']} />
                <FormSelect label="Primary Doctor" options={['Dr. John Doe']} />
                <FormSelect label="Hospital" options={['General Hospital']} />
                <FormInput label="Surgery Date" defaultValue="2025-12-30T09:00" readOnly />
                <FormSelect label="Status" options={['Scheduled']} />
            </FormContainer>
        </div>
    );
}
