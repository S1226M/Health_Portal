import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function CityListPage() {
    const data = [
        { id: 1, name: 'Pune', state: 'Maharashtra', pincode: '411001' },
        { id: 2, name: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
        { id: 3, name: 'San Francisco', state: 'California', pincode: '94105' },
    ];

    const columns = [
        { header: 'City Name', accessor: 'name' },
        { header: 'State', accessor: 'state' },
        { header: 'Pincode', accessor: 'pincode' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Cities"
                description="Manage cities for address selection."
                actionLabel="Add City"
                actionUrl="/admin/components/loc/city/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data}
                basePath="/admin/components/loc/city"
            />
        </div>
    );
}
