import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function SurgeryListPage() {
    const data = [
        { id: 1, name: 'Appendectomy', code: 'APP01', hosp: 'General Hospital', price: '15000.00' },
    ];

    const columns = [
        { header: 'Surgery Name', accessor: 'name' },
        { header: 'Code', accessor: 'code' },
        { header: 'Hospital', accessor: 'hosp' },
        { header: 'Base Price', accessor: 'price' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Surgeries" actionLabel="Add Surgery" actionUrl="/admin/components/sur/surgery/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/sur/surgery" />
        </div>
    );
}
