import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';

export default function AddPaymentModePage() {
    return (
        <div className="p-6">
            <PageHeader title="Add Payment Mode" backUrl="/admin/components/pay/paymentmode" />
            <FormContainer onCancelUrl="/admin/components/pay/paymentmode">
                <FormInput label="Mode Name" placeholder="e.g. UPI" fullWidth />
            </FormContainer>
        </div>
    );
}
