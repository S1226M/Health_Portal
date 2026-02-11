import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';
import { Column } from '@/app/admin/components/Common/Table';

export default async function ReceiptListPage() {
    const data = await prisma.hop_receipt.findMany({
        where: { IsDeleted: false },
        include: {
            hop_opd: {
                include: { hop_patient: true }
            },
            pay_paymentmode: true
        }
    });

    const flatData = data.map(r => ({
        ...r,
        PatientName: r.hop_opd?.hop_patient?.PatientName,
        PaymentMode: r.pay_paymentmode?.PaymentModeName
    }));

    const autoColumns = generateColumns(flatData, [
        "Created",
        "Modified",
        "CreatedByUserID",
        "ModifiedByUserID",
        "IsDeleted",
        "hop_opd",
        "pay_paymentmode"
    ]);

    const columns: Column<typeof flatData[number]>[] = [
        ...autoColumns,
        { header: "PatientName", key: "PatientName" },
        { header: "PaymentMode", key: "PaymentMode" },
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Receipts"
                actionLabel="Add Receipt"
                actionUrl="/admin/components/hop/receipt/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={flatData}
                idKey='ReceiptID'
                basePath="/admin/components/hop/receipt"
                moduleName="Receipt"
            />
        </div>
    );
}
