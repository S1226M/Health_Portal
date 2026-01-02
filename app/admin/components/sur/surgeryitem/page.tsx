import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function SurgeryItemListPage() {
    const data = [
        { id: 1, type: 'Medicine', name: 'Cotton Roll', qty: '5', amount: '500.00' },
    ];

    const columns = [
        { header: 'Type', accessor: 'type' },
        { header: 'Item Name', accessor: 'name' },
        { header: 'Quantity', accessor: 'qty' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Surgery Items" actionLabel="Add Item" actionUrl="/admin/components/sur/surgeryitem/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/sur/surgeryitem" />
        </div>
    );
}
