import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table, Column } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function CityListPage() {
    const data = await prisma.loc_city.findMany({
        where: { IsDeleted: false }
    });

    const autoColumns = generateColumns(data,[
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted"
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
                title="Cities"
                actionLabel="Add City"
                actionUrl="/admin/components/loc/city/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='CityID'
                basePath="/admin/components/loc/city"
                moduleName="city"
            />
        </div>
    );
}
