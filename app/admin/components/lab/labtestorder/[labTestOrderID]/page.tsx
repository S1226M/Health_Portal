import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ labTestOrderID: string }>;
}

export default async function ViewLabTestOrderPage({ params }: PageProps) {
    const { labTestOrderID } = await params;
    const id = Number(labTestOrderID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('lab_labtestorder'),
        prisma.lab_labtestorder.findFirst({
            where: { LabTestOrderID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Lab Test Order Details"
                backUrl="/admin/components/lab/labtestorder"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
