import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function LabTestOrderListPage() {
    const data = [
        { id: 1, patient: 'Smit M', type: 'Pathology', status: 'Paid', date: '2025-12-30' },
    ];

    const columns = [
        { header: 'Patient', accessor: 'patient' },
        { header: 'Test Type', accessor: 'type' },
        { header: 'Payment Status', accessor: 'status' },
        { header: 'Date', accessor: 'date' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Lab Test Orders"
                actionLabel="New Order"
                actionUrl="/admin/components/lab/labtestorder/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/lab/labtestorder" />
        </div>
    );
}
