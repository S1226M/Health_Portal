import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Column, Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

// Helper function to convert Prisma Decimals/BigInts to plain JSON
// This prevents the "Decimal objects are not supported" error
function serializePrismaData(data: any) {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export default async function HospitalListPage() {
    // 1. Fetch raw data from Prisma
    const rawData = await prisma.hop_hospital.findMany({
        where: {
            IsDeleted: false // Good practice to filter out deleted records
        }
    });

    // 2. Sanitize data so it contains only plain objects (No Decimals)
    const data = serializePrismaData(rawData);

    // 3. Generate columns based on the sanitized data
    const autoColumns = generateColumns(data, [
        'Created',
        'Modified',
        'CreatedByUserID',
        'ModifiedByUserID',
        'IsDeleted',
    ]);

    const columns: Column<typeof data[number]>[] = [
        ...autoColumns,
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Hospitals"
                actionLabel="Add Hospital"
                actionUrl="/admin/components/hop/hospital/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data} // This is now a "safe" plain object array
                idKey='HospitalID'
                basePath="/admin/components/hop/hospital"
                moduleName='hospital'
            />
        </div>
    );
}