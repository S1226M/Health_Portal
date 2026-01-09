import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer, FormInput } from '@/app/admin/components/Common/Form';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ViewTable } from '../../../Common/commonViewTable';
import { getColumns } from '../../../Common/columns';

export default async function CountryDetailPage({ params }: { params: Promise<{ countryID: string }> }) {
    const { countryID } = await params;
    const id = Number(countryID);

    if (Number.isNaN(id)) notFound();

    const [rawColumns, country] = await Promise.all([
        getColumns(),
        prisma.loc_country.findFirst({ where: { CountryID: id } })
    ])

    if (!country) notFound();

    const formattedColumns = rawColumns.map((col) => ({
        accessor: col.COLUMN_NAME,
        header: col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim(), 
    }));
    
    // In a real app, fetch data based on params.id
    return (
        <div className="p-6">
            <PageHeader
                title="Country Details"
                backUrl="/admin/components/loc/country"
            />

            <ViewTable  
                columns={formattedColumns}
                data={country}
            />
        </div>
    );
}
