import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';
import { prisma } from '@/lib/prisma';
import { generateColumns } from '@/app/admin/utils/generateColumns';

export default async function PaymentModeListPage() {
    const data = await prisma.pay_paymentmode.findMany();

    const autoColumns = generateColumns(data, [
        'Created',
        'Modified',
        'CreatedByUserID',
        'ModifiedByUserID',
        'IsDeleted',
    ])

    const columns: Column<typeof data[number]>[] = [
        ...autoColumns,
        {
            header: 'Actions',
            isAction: true,
        },
    ];

    return (
        <div className='p-6'>
            <PageHeader
                title="Payment Modes"
                actionLabel="Add PaymentMode"
                actionUrl="/admin/components/pay/paymentmode/add"
            />
            <div className="mb-6">
                <SearchBar />
            </div>
            <Table
                columns={columns}
                data={data}
                idKey='PaymentModeID'
                basePath="/admin/components/pay/paymentmode"
                moduleName="paymentmode"
            />
        </div>
    );
}
