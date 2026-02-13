import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ stateID: string }>;
}) {
  const { stateID } = await params;
  const id = Number(stateID);
  if (Number.isNaN(id)) notFound();

  const [rawColumns, state] = await Promise.all([
    getColumns("loc_state"),
    prisma.loc_state.findFirst({ where: { StateID: id } }),
  ]);

  if (!state) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6">
      <PageHeader title="State Details" backUrl="/admin/components/loc/state" />

      <ViewTable columns={formattedColumns} data={state} />
    </div>
  );
}
