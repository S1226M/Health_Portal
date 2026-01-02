import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default async function PaymentModeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="p-6">
            <PageHeader title="Mode Details" backUrl="/admin/components/pay/paymentmode" />
            <FormContainer onCancelUrl="/admin/components/pay/paymentmode">
                <FormInput label="Mode Name" defaultValue="Cash" readOnly fullWidth />
            </FormContainer>
        </div>
    );
}
