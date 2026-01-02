import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function HospitalListPage() {
    const data = [
        { id: 1, name: 'General Hospital', city: 'Pune', charge: '500.00' },
        { id: 2, name: 'Apollo Clinic', city: 'Mumbai', charge: '800.00' },
    ];

    const columns = [
        { header: 'Hospital Name', accessor: 'name' },
        { header: 'City', accessor: 'city' },
        { header: 'Reg. Charge', accessor: 'charge' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Hospitals"
                description="Manage hospital branches."
                actionLabel="Add Hospital"
                actionUrl="/admin/components/hop/hospital/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data}
                basePath="/admin/components/hop/hospital"
            />
        </div>
    );
}
