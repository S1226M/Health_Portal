import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';
import { Column } from '@/app/admin/components/Common/Table';

export default async function ReceiptTranListPage() {
    const data = await prisma.hop_receipttran.findMany({
        where: { IsDeleted: false },
        include: {
            hop_receipt: { select: { ReceiptNo: true } },
            hop_subtreatmenttype: { select: { SubTreatmentTypeName: true } },
            phm_medicine: { select: { MedicineName: true } },
            lab_labtest: { select: { TestName: true } }
        }
    });

    const flatData = data.map(r => ({
        ...r,
        ReceiptNo: r.hop_receipt?.ReceiptNo,
        SubTreatment: r.hop_subtreatmenttype?.SubTreatmentTypeName,
        Medicine: r.phm_medicine?.MedicineName,
        LabTest: r.lab_labtest?.TestName
    }));

    const autoColumns = generateColumns(flatData, [
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted",
        "hop_receipt",
        "hop_subtreatmenttype",
        "phm_medicine",
        "lab_labtest"
    ]);

    const columns: Column<typeof flatData[number]>[] = [
        ...autoColumns,
        { header: "ReceiptNo", key: "ReceiptNo" },
        { header: "SubTreatment", key: "SubTreatment" },
        { header: "Medicine", key: "Medicine" },
        { header: "LabTest", key: "LabTest" },
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Receipt Transactions"
                actionLabel="Add Transaction"
                actionUrl="/admin/components/hop/receipttran/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={flatData}
                idKey='ReceiptTranID'
                basePath="/admin/components/hop/receipttran"
                moduleName="ReceiptTran"
            />
        </div>
    );
}
