import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../Common/columns";
import { prisma } from "@/lib/prisma";
import SaveReceipt from "@/app/admin/modules/hop/receipt/action/SaveReceipt";

export default async function AddReceiptPage() {
  const columns = await getColumns("hop_receipt");

  // Fetch Payment Modes
  const paymentModes = await prisma.pay_paymentmode.findMany({
    where: { IsDeleted: false },
  });

  // Fetch OPDs
  const opds = await prisma.hop_opd.findMany({
    where: { IsDeleted: false },
    include: { hop_patient: { select: { PatientName: true } } },
    orderBy: { Created: "desc" },
    take: 100, // Limit for performance? or remove take if simple CRUD requires all options
  });

  const paymentModeOptions = paymentModes.map((p) => ({
    label: p.PaymentModeName,
    value: p.PaymentModeID,
  }));

  const opdOptions = opds.map((o) => ({
    label: `OPD #${o.OPDID} - ${o.hop_patient.PatientName} (${new Date(o.OPDDateTime).toLocaleDateString()})`,
    value: o.OPDID,
  }));

  return (
    <>
      <PageHeader title="Add Receipt" backUrl="/admin/components/hop/receipt" />

      <FormContainer
        columns={columns}
        action={SaveReceipt}
        onCancelUrl="/admin/components/hop/receipt"
        skipFields={["ReceiptID", "UserID"]}
        selectOptions={{
          PaymentModeID: paymentModeOptions,
          OPDID: opdOptions,
        }}
      />
    </>
  );
}
