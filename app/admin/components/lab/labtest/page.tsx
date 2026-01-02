import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function LabTestListPage() {
    const data = [
        { id: 1, name: 'Complete Blood Count', code: 'CBC', price: '400.00' },
        { id: 2, name: 'Lipid Profile', code: 'LIPID', price: '1200.00' },
    ];

    const columns = [
        { header: 'Test Name', accessor: 'name' },
        { header: 'Test Code', accessor: 'code' },
        { header: 'Price', accessor: 'price' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Lab Tests"
                actionLabel="Add Lab Test"
                actionUrl="/admin/components/lab/labtest/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/lab/labtest" />
        </div>
    );
}
