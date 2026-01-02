import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function MedicineCategoryListPage() {
    const data = [
        { id: 1, name: 'Tablet' }, { id: 2, name: 'Syrup' },
    ];

    const columns = [
        { header: 'Category Name', accessor: 'name' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Medicine Categories" actionLabel="Add Category" actionUrl="/admin/components/phm/medicinecategory/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/phm/medicinecategory" />
        </div>
    );
}
