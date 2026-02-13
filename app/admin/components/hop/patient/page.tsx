import React from "react";
import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { Column } from "@/app/admin/components/Common/Table";

export default async function PatientListPage() {
  const data = await prisma.hop_patient.findMany({
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
        title="Patients"
        actionLabel="Add Patient"
        actionUrl="/admin/components/hop/patient/add"
      />
      <div className="mb-6">
        <SearchBar />
      </div>
      <Table
        columns={columns}
        data={data}
        idKey="PatientID"
        basePath="/admin/components/hop/patient"
        moduleName="Patient"
      />
    </div>
  );
}
