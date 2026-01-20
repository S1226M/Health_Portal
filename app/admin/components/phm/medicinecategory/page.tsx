import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table, Column } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function MedicineCategoryListPage() {
    const data = await prisma.phm_medicinecategory.findMany();

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
                title="Medicine Categories"
                actionLabel="Add Category"
                actionUrl="/admin/components/phm/medicinecategory/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='MedicineCategoryID'
                basePath="/admin/components/phm/medicinecategory"
                moduleName="medicineCategory"
            />
        </div>
    );
}
