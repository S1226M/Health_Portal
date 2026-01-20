import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ labTestTypeID: string }>;
}

export default async function ViewLabTestTypePage({ params }: PageProps) {
    const { labTestTypeID } = await params;
    const id = Number(labTestTypeID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('lab_labtesttype'),
        prisma.lab_labtesttype.findFirst({
            where: { LabTestTypeID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Lab Test Type Details"
                backUrl="/admin/components/lab/labtesttype"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
