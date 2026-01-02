import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function MedicineListPage() {
    const data = [
        { id: 1, name: 'Paracetamol', cat: 'Tablet', price: '10.00', mfr: 'GSK' },
    ];

    const columns = [
        { header: 'Medicine Name', accessor: 'name' },
        { header: 'Category', accessor: 'cat' },
        { header: 'Price', accessor: 'price' },
        { header: 'Manufacturer', accessor: 'mfr' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Medicines"
                actionLabel="Add Medicine"
                actionUrl="/admin/components/phm/medicine/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/phm/medicine" />
        </div>
    );
}
