import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function CountryListPage() {
    const data = [
        { id: 1, name: 'India', code: 'IN', phoneCode: '+91' },
        { id: 2, name: 'United States', code: 'US', phoneCode: '+1' },
        { id: 3, name: 'United Kingdom', code: 'UK', phoneCode: '+44' },
    ];

    const columns = [
        { header: 'Country Name', accessor: 'name' },
        { header: 'ISO Code', accessor: 'code' },
        { header: 'Phone Code', accessor: 'phoneCode' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Countries"
                description="Manage global country entries."
                actionLabel="Add Country"
                actionUrl="/admin/components/loc/country/add"
            />

            <div className="mb-6">
                <SearchBar />
            </div>

            <Table
                columns={columns}
                data={data}
                basePath="/admin/components/loc/country"
            />
        </div>
    );
}
