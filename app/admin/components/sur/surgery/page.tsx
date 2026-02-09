import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table, Column } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function SurgeryListPage() {
    const data = await prisma.sur_surgery.findMany({ where: { IsDeleted: false } });

    const autoColumns = generateColumns(data, [
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted"  
    ])

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
                title="Surgeries" 
                actionLabel="Add Surgery" 
                actionUrl="/admin/components/sur/surgery/add" 
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table 
                idKey='SurgeryID'
                columns={columns} 
                data={data} 
                basePath="/admin/components/sur/surgery" 
                moduleName="surgery" 
            />
        </div>
    );
}
