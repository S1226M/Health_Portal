import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ViewTable } from '../../../Common/commonViewTable';
import { getColumns } from '../../../Common/columns';

export default async function SpecializationDetailPage({ params }: { params: Promise<{ specializationID: string }> }) {
  const { specializationID } = await params;
  const id = Number(specializationID);

  if (Number.isNaN(id)) notFound();

  const [rawColumns, specialization] = await Promise.all([
    getColumns(),
    prisma.hop_specialization.findFirst({ where: { SpecializationID: id } })
  ]);

  if (!specialization) notFound();

  const formattedColumns = rawColumns.map((col) => ({
    accessor: col.COLUMN_NAME,
    header: col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim(), 
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Specialization Details" 
        backUrl="/admin/components/hop/specialization" 
      />
      
      <ViewTable  
        columns={formattedColumns}
        data={specialization}
      />
    </div>
  );
}