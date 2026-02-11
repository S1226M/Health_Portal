import { prisma } from "@/lib/prisma";
import { Column, Table } from "../../Common/Table";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { PageHeader, SearchBar } from "../../Common/PageHeader";

export default async function UsserPage(){
    const data = await prisma.sec_user.findMany({
        where: { IsDeleted: false }
    })

    const autoColumns = generateColumns(data, [
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

    return(
        <div className="p-6">
            <PageHeader
                title="user"
                actionLabel="Add user"
                actionUrl="/admin/components/sec/user/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='UserID'
                basePath="/admin/components/sec/user"
                moduleName="User"
            />
        </div>
    )
}