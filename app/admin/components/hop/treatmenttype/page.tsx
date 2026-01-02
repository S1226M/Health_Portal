import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function TreatmentTypeListPage() {
    const data = [
        { id: 1, name: 'Consultation', shortName: 'CONS' },
        { id: 2, name: 'Surgery', shortName: 'SURG' },
    ];

    const columns = [
        { header: 'Treatment Name', accessor: 'name' },
        { header: 'Short Code', accessor: 'shortName' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Treatment Types"
                actionLabel="Add Treatment Type"
                actionUrl="/admin/components/hop/treatmenttype/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/treatmenttype" />
        </div>
    );
}
