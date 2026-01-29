import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ receiptID: string }>;
}

export default async function ReceiptDetailPage({ params }: PageProps) {
    const { receiptID } = await params;
    const id = Number(receiptID);

    if (isNaN(id)) notFound();

    const [rawColumns, receipt] = await Promise.all([
        getColumns('hop_receipt'),
        prisma.hop_receipt.findFirst({
            where: { ReceiptID: id },
            include: {
                hop_opd: {
                    include: { hop_patient: true }
                },
                pay_paymentmode: true
            }
        })
    ]);

    if (!receipt) notFound();

    const flatReceipt = {
        ...receipt,
        PatientName: receipt.hop_opd?.hop_patient?.PatientName,
        PaymentMode: receipt.pay_paymentmode?.PaymentModeName,
        OPDDetails: `OPD #${receipt.OPDID}`
    };

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Receipt Details"
                backUrl="/admin/components/hop/receipt"
            />

            <ViewTable
                columns={formattedColumns}
                data={flatReceipt}
            />
        </div>
    );
}
