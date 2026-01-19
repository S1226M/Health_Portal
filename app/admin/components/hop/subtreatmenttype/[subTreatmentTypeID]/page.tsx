import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ subTreatmentTypeID: string }>;
}

export default async function SubTreatmentTypeDetailPage({ params }: PageProps) {
    const { subTreatmentTypeID } = await params;
    const id = Number(subTreatmentTypeID);

    if (isNaN(id)) notFound();

    const [rawColumns, subTreatmentType] = await Promise.all([
        getColumns('hop_subtreatmenttype'),
        prisma.hop_subtreatmenttype.findFirst({
            where: { SubTreatmentTypeID: id }
        })
    ]);

    if (!subTreatmentType) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Sub Treatment Type Details"
                backUrl="/admin/components/hop/subtreatmenttype"
            />

            <ViewTable
                columns={formattedColumns}
                data={subTreatmentType}
            />
        </div>
    );
}
