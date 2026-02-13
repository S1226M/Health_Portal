import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../../Common/columns";
import { prisma } from "@/lib/prisma";
import EditReceiptTran from "@/app/admin/modules/hop/receipttran/action/editReceiptTran";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ receiptTranID: string }>;
}

export default async function EditReceiptTranPage({ params }: PageProps) {
  const { receiptTranID } = await params;
  const id = Number(receiptTranID);

  if (isNaN(id)) notFound();

  const [columns, receiptTran, receipts, subTreatments, medicines, labTests] =
    await Promise.all([
      getColumns("hop_receipttran"),
      prisma.hop_receipttran.findFirst({
        where: { ReceiptTranID: id },
      }),
      prisma.hop_receipt.findMany({
        where: { IsDeleted: false },
        select: { ReceiptID: true, ReceiptNo: true, OPDID: true },
        orderBy: { Created: "desc" },
        take: 50,
      }),
      prisma.hop_subtreatmenttype.findMany({
        where: { IsDeleted: false, IsActive: true },
        select: { SubTreatmentTypeID: true, SubTreatmentTypeName: true },
      }),
      prisma.phm_medicine.findMany({
        where: { IsDeleted: false }, // Medicine active check?
        select: { MedicineID: true, MedicineName: true },
      }),
      prisma.lab_labtest.findMany({
        where: { IsDeleted: false },
        select: { LabTestID: true, TestName: true },
      }),
    ]);

  if (!receiptTran) notFound();

  const receiptOptions = receipts.map((r) => ({
    label: r.ReceiptNo
      ? `${r.ReceiptNo} (OPD#${r.OPDID})`
      : `Receipt #${r.ReceiptID} (OPD#${r.OPDID})`,
    value: r.ReceiptID,
  }));

  const subTreatmentOptions = subTreatments.map((s) => ({
    label: s.SubTreatmentTypeName,
    value: s.SubTreatmentTypeID,
  }));

  const medicineOptions = medicines.map((m) => ({
    label: m.MedicineName,
    value: m.MedicineID,
  }));

  const labTestOptions = labTests.map((l) => ({
    label: l.TestName,
    value: l.LabTestID,
  }));

  return (
    <>
      <PageHeader
        title="Edit Receipt Transaction"
        backUrl="/admin/components/hop/receipttran"
      />

      <FormContainer
        columns={columns}
        action={EditReceiptTran}
        initialData={receiptTran as any}
        onCancelUrl="/admin/components/hop/receipttran"
        skipFields={[
          "ReceiptTranID",
          "UserID",
          "Created",
          "CreatedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          ReceiptID: receiptOptions,
          SubTreatmentTypeID: subTreatmentOptions,
          MedicineID: medicineOptions,
          LabTestID: labTestOptions,
        }}
      />
    </>
  );
}
