import React from "react";
import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { Column } from "@/app/admin/components/Common/Table";

export default async function AppointmentListPage() {
  const data = await prisma.hop_appointment.findMany({
    where: { IsDeleted: false },
  });

  const autoColumns = generateColumns(data, [
    "Created",
    "Modified",
    "CreatedByUserID",
    "ModifiedByUserID",
    "IsDeleted",
  ]);

  const columns: Column<(typeof data)[number]>[] = [
    ...autoColumns,
    {
      header: "Actions",
      isAction: true,
    },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Appointments"
        actionLabel="Add Appointment"
        actionUrl="/admin/components/hop/appointment/add"
      />
      <div className="mb-6">
        <SearchBar />
      </div>
      <Table
        columns={columns}
        data={data}
        idKey="AppointmentID"
        basePath="/admin/components/hop/appointment"
        moduleName="Appointment"
      />
    </div>
  );
}
