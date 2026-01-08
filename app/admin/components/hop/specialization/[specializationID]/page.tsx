import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ViewTable } from '../../../Common/commonViewTable';
import { getSpecializationColumns } from '../../../Common/columns';

export default async function SpecializationDetailPage({ params }: { params: Promise<{ specializationID: string }> }) {
  const { specializationID } = await params;
  const id = Number(specializationID);

  if (Number.isNaN(id)) notFound();

  // Fetch data and raw columns
  const [rawColumns, specialization] = await Promise.all([
    getSpecializationColumns(),
    prisma.hop_specialization.findFirst({ where: { SpecializationID: id } })
  ]);

  if (!specialization) notFound();

  // Map raw DB columns into standard objects with headers and accessors
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
      
      {/* Passing everything to the common component */}
      <ViewTable  
        columns={formattedColumns}
        data={specialization}
      />
    </div>
  );
}