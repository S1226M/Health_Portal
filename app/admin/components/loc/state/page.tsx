import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function StateListPage() {
    const data = [
        { id: 1, name: 'Maharashtra', country: 'India' },
        { id: 2, name: 'California', country: 'United States' },
        { id: 3, name: 'London', country: 'United Kingdom' },
    ];

    const columns = [
        { header: 'State Name', accessor: 'name' },
        { header: 'Country', accessor: 'country' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="States"
                description="Manage states and provinces."
                actionLabel="Add State"
                actionUrl="/admin/components/loc/state/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data}
                basePath="/admin/components/loc/state"
            />
        </div>
    );
}
