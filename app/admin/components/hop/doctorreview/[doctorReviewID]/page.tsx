import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ doctorReviewID: string }>;
}

export default async function DoctorReviewDetailPage({ params }: PageProps) {
    const { doctorReviewID } = await params;
    const id = Number(doctorReviewID);

    if (isNaN(id)) notFound();

    const [rawColumns, doctorReview] = await Promise.all([
        getColumns('hop_doctorreview'),
        prisma.hop_doctorreview.findFirst({
            where: { DoctorReviewID: id }
        })
    ]);

    if (!doctorReview) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Doctor Review Details"
                backUrl="/admin/components/hop/doctorreview"
            />

            <ViewTable
                columns={formattedColumns}
                data={doctorReview}
            />
        </div>
    );
}
