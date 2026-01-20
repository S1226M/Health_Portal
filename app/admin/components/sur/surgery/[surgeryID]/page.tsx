import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ surgeryID: string }>;
}

export default async function ViewSurgeryPage({ params }: PageProps) {
    const { surgeryID } = await params;
    const id = Number(surgeryID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('sur_surgery'),
        prisma.sur_surgery.findFirst({
            where: { SurgeryID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Surgery Details"
                backUrl="/admin/components/sur/surgery"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
