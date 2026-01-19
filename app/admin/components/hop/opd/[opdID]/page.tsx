import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ opdID: string }>;
}

export default async function OPDDetailPage({ params }: PageProps) {
    const { opdID } = await params;
    const id = Number(opdID);

    if (isNaN(id)) notFound();

    const [rawColumns, opd] = await Promise.all([
        getColumns('hop_opd'),
        prisma.hop_opd.findFirst({
            where: { OPDID: id }
        })
    ]);

    if (!opd) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="OPD Details"
                backUrl="/admin/components/hop/opd"
            />

            <ViewTable
                columns={formattedColumns}
                data={opd}
            />
        </div>
    );
}
