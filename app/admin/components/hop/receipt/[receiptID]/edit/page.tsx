import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../../Common/columns";
import { prisma } from "@/lib/prisma";
import EditReceipt from "@/app/admin/modules/hop/receipt/action/editReceipt";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ receiptID: string }>;
}

export default async function EditReceiptPage({ params }: PageProps) {
  const { receiptID } = await params;
  const id = Number(receiptID);

  if (isNaN(id)) notFound();

  const [columns, receipt, paymentModes, opds] = await Promise.all([
    getColumns("hop_receipt"),
    prisma.hop_receipt.findFirst({
      where: { ReceiptID: id },
    }),
    prisma.pay_paymentmode.findMany({
      where: { IsDeleted: false },
    }),
    prisma.hop_opd.findMany({
      where: { IsDeleted: false },
      include: { hop_patient: { select: { PatientName: true } } },
      orderBy: { Created: "desc" },
      take: 100,
    }),
  ]);

  if (!receipt) notFound();

  const paymentModeOptions = paymentModes.map((p) => ({
    label: p.PaymentModeName,
    value: p.PaymentModeID,
  }));

  const opdOptions = opds.map((o) => ({
    label: `OPD #${o.OPDID} - ${o.hop_patient.PatientName}`,
    value: o.OPDID,
  }));

  return (
    <>
      <PageHeader
        title="Edit Receipt"
        backUrl="/admin/components/hop/receipt"
      />

      <FormContainer
        columns={columns}
        action={EditReceipt}
        initialData={receipt as any}
        onCancelUrl="/admin/components/hop/receipt"
        skipFields={[
          "ReceiptID",
          "UserID",
          "Created",
          "CreatedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          PaymentModeID: paymentModeOptions,
          OPDID: opdOptions,
        }}
      />
    </>
  );
}
