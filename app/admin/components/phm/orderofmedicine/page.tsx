import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function OrderOfMedicineListPage() {
    const data = [
        { id: 1, medicine: 'Paracetamol', qty: '10', type: 'Cash', date: '2025-12-30' },
    ];

    const columns = [
        { header: 'Medicine', accessor: 'medicine' },
        { header: 'Quantity', accessor: 'qty' },
        { header: 'Payment Type', accessor: 'type' },
        { header: 'Date', accessor: 'date' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Medicine Orders" actionLabel="New Order" actionUrl="/admin/components/phm/orderofmedicine/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/phm/orderofmedicine" />
        </div>
    );
}
