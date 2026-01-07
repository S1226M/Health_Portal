import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function SpecializationDetailPage({ params }: { params: { specializationID: string } }) {
    const id = Number(params.specializationID);

    if (Number.isNaN(id)) {
      notFound();
    }

    const specialization = await prisma.hop_specialization.findFirst({
      where: {
        SpecializationID: id,
      },
    });
    // const { specializationID } = params;
    // console.log("Type id is:", specializationID);

    // const specialization = await prisma.hop_specialization.findUnique({
    //   where: { SpecializationID: Number(specializationID) }
    // });


    if (!specialization) {
      notFound();
    }

    

    return (
        <div className="p-6">
            <PageHeader title="Specialization Details" backUrl="/admin/components/hop/specialization" />
            <FormContainer onCancelUrl="/admin/components/hop/specialization">
                <FormInput
                  label="Name"
                  defaultValue={specialization?.SpecializationName ?? ""}
                  readOnly
                  fullWidth
                />

                <FormInput
                  label="Description"
                  defaultValue={specialization?.Description ?? ""}
                  readOnly
                  fullWidth
                />
            </FormContainer>
        </div>
    );
}
