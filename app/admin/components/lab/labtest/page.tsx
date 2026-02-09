import React from 'react';
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { prisma } from "@/lib/prisma";
import { Table, Column } from '../../Common/Table';
import { PageHeader, SearchBar } from '../../Common/PageHeader';

export default async function AddLabTestListPage(){
    const data = await prisma.lab_labtest.findMany({
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

    return(
        <div className="p-6">
            <PageHeader
                title="Lab Tests"
                actionLabel="Add Lab Test"
                actionUrl="/admin/components/lab/labtest/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='LabTestID'
                basePath="/admin/components/lab/labtest"
                moduleName="labTest"
            />
        </div>
    )

}