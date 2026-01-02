import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function DiagnosisTypeListPage() {
    const data = [
        { id: 1, name: 'ICD-10', shortName: 'ICD10', hospital: 'General Hospital' },
    ];

    const columns = [
        { header: 'Diagnosis Type', accessor: 'name' },
        { header: 'Code', accessor: 'shortName' },
        { header: 'Hospital', accessor: 'hospital' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Diagnosis Types"
                actionLabel="Add Diagnosis Type"
                actionUrl="/admin/components/hop/diagnosistype/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/diagnosistype" />
        </div>
    );
}
