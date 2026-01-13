import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Column, Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function HospitalListPage() {
    const data = await prisma.hop_hospital.findMany();

    const autoColumns = generateColumns(data, [
        'Created',
        'Modified',
        'CreatedByUserID',
        'ModifiedByUserID',
        'IsDeleted',
    ])

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
                data={data}
                idKey='HospitalID'
                basePath="/admin/components/hop/hospital"
                moduleName='hospital'
            />
        </div>
    );
}
