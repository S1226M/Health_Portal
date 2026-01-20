import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table, Column } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function LabTestOrderListPage() {
    const data = await prisma.lab_labtestorder.findMany();

    const autoColumns = generateColumns(data, [
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted"
    ]);

    const columns: Column[] = [
        ...autoColumns,
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Lab Test Orders"
                actionLabel="Add Lab Order"
                actionUrl="/admin/components/lab/labtestorder/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='LabTestOrderID'
                basePath="/admin/components/lab/labtestorder"
                moduleName="labTestOrder"
            />
        </div>
    );
}
