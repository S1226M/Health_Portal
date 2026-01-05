import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';
import { prisma } from '@/lib/prisma';

export default async function SpecializationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params);
    console.log("Type id is:", id);

    const specialization = await prisma.hop_specialization.findFirst({
        where: {SpecializationID : Number(id)}
    })
    
    console.log(specialization);

    return (
        <div className="p-6">
            <PageHeader title="Specialization Details" backUrl="/admin/components/hop/specialization" />
            <FormContainer onCancelUrl="/admin/components/hop/specialization">
                <FormInput label="Name" defaultValue="Cardiology"  readOnly fullWidth >{specialization?.SpecializationName}</FormInput>
                <FormInput label="Description" defaultValue="Heart related" readOnly fullWidth >{specialization?.Description}</FormInput>
            </FormContainer>
        </div>
    );
}
