import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
// import { getSpecializationColumns } from '../../../Common/columns';

export default async function SpecializationDetailPage({ params }: { params: Promise<{ specializationID: string }> }) {
  // const columns = await getSpecializationColumns();
  // console.log("Columns:", columns);

  const { specializationID } = await params;
  const id = Number(specializationID);

  if (Number.isNaN(id)) {
    notFound();
  }

  const specialization = await prisma.hop_specialization.findFirst({
    where: {
      SpecializationID: id,
    },
  });

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
