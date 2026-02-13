import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

export default async function PaymentModeDetailPage({
  params,
}: {
  params: Promise<{ paymentmodeID: string }>;
}) {
  const { paymentmodeID } = await params;
  const id = Number(paymentmodeID);

  if (Number.isNaN(id)) notFound();

  const [rawColumns, paymentMode] = await Promise.all([
    getColumns("pay_paymentmode"),
    prisma.pay_paymentmode.findFirst({ where: { PaymentModeID: id } }),
  ]);

  if (!paymentMode) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Mode Details"
        backUrl="/admin/components/pay/paymentmode"
      />

      <ViewTable columns={formattedColumns} data={paymentMode} />
    </div>
  );
}
