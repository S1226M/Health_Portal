import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function PaymentModeListPage() {
    const data = [
        { id: 1, name: 'Cash' }, { id: 2, name: 'Credit Card' },
    ];

    const columns = [
        { header: 'Payment Mode', accessor: 'name' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Payment Modes" actionLabel="Add Mode" actionUrl="/admin/components/pay/paymentmode/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/pay/paymentmode" />
        </div>
    );
}
