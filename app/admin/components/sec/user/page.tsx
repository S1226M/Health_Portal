import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';
import { Column } from '@/app/admin/components/Common/Table';

export default async function UserListPage() {
    const data = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        include: {
            sec_role: {
                select: { RoleName: true }
            }
        }
    });

    // Flatten logic if needed for display, but Table might handle object?
    // Existing ViewTable usually takes direct data.
    // Current Table component usage in loc/city:
    /*
        const autoColumns = generateColumns(data,[...]); 
        const columns = [...autoColumns, { header: 'Actions', isAction: true }];
    */

    const autoColumns = generateColumns(data, [
        "Password",
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted",
        "sec_role" // Hide the object itself, maybe show RoleName?
    ]);

    // Manually adding RoleName column if generateColumns doesn't handle relation flattening
    // Check generateColumns implementation? I didn't read it.
    // Assuming standard behavior, let's just show basic columns. 
    // If I want to show RoleName, I might need to map data.

    const flatData = data.map(u => ({
        ...u,
        RoleName: u.sec_role?.RoleName
    }));

    const autoColumnsFlatted = generateColumns(flatData, [
        "Password",
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted",
        "sec_role"
    ]);

    const columns: Column<typeof flatData[number]>[] = [
        ...autoColumnsFlatted,
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Users"
                actionLabel="Add User"
                actionUrl="/admin/components/sec/user/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={flatData}
                idKey='UserID'
                basePath="/admin/components/sec/user"
                moduleName="user"
            />
        </div>
    );
}
