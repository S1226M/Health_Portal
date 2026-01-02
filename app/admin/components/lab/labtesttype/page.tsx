import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function LabTestTypeListPage() {
    const data = [
        { id: 1, name: 'Pathology' },
        { id: 2, name: 'Radiology' },
    ];

    const columns = [
        { header: 'Type Name', accessor: 'name' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Lab Test Types"
                actionLabel="Add Test Type"
                actionUrl="/admin/components/lab/labtesttype/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/lab/labtesttype" />
        </div>
    );
}
