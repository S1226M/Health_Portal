import { Table, Column } from "../../Common/Table";
import { PageHeader, SearchBar } from "../../Common/PageHeader";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { prisma } from "@/lib/prisma";

export default async function MedicineOrderPaymentTypeListPage() {
    const data = await prisma.phm_medicineorderpaymenttype.findMany({
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
                title="Medicine Order Payment Types"
                actionLabel="Create Payment Type"
                actionUrl="/admin/components/phm/medicineorderpaymenttype/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='MedicineOrderPaymentTypeID'
                basePath="/admin/components/phm/medicineorderpaymenttype"
                moduleName="MedicineOrderPaymentType"
            />
        </div>
    )
} 