import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table, Column } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function OrderOfMedicineListPage() {
    const data = await prisma.phm_orderofmedicine.findMany({
        where: { IsDeleted: false }
    });

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
                title="Medicine Orders"
                actionLabel="Create Order"
                actionUrl="/admin/components/phm/orderofmedicine/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='OrderOfMedicineID'
                basePath="/admin/components/phm/orderofmedicine"
                moduleName="OrderOfMedicine"
            />
        </div>
    );
}
