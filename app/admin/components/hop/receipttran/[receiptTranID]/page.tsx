import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ receiptTranID: string }>;
}

export default async function ReceiptTranDetailPage({ params }: PageProps) {
    const { receiptTranID } = await params;
    const id = Number(receiptTranID);

    if (isNaN(id)) notFound();

    const [rawColumns, receiptTran] = await Promise.all([
        getColumns('hop_receipttran'),
        prisma.hop_receipttran.findFirst({
            where: { ReceiptTranID: id },
            include: {
                hop_receipt: { select: { ReceiptNo: true, OPDID: true } },
                hop_subtreatmenttype: { select: { SubTreatmentTypeName: true } },
                phm_medicine: { select: { MedicineName: true } },
                lab_labtest: { select: { TestName: true } }
            }
        })
    ]);

    if (!receiptTran) notFound();

    const flatTran = {
        ...receiptTran,
        ReceiptNo: receiptTran.hop_receipt?.ReceiptNo,
        OPDID: receiptTran.hop_receipt?.OPDID,
        SubTreatment: receiptTran.hop_subtreatmenttype?.SubTreatmentTypeName,
        Medicine: receiptTran.phm_medicine?.MedicineName,
        LabTest: receiptTran.lab_labtest?.TestName
    };

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Receipt Transaction Details"
                backUrl="/admin/components/hop/receipttran"
            />

            <ViewTable
                columns={formattedColumns}
                data={flatTran}
            />
        </div>
    );
}
