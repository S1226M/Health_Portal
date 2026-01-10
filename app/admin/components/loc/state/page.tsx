import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function StateListPage() {
    const data = await prisma.loc_state.findMany();

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
                title="States"
                description="Manage states and provinces."
                actionLabel="Add State"
                actionUrl="/admin/components/loc/state/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data}
                idKey='StateID'
                basePath="/admin/components/loc/state"
                moduleName="state"
            />
        </div>
    );
}
