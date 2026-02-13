import React from "react";
import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { Column } from "@/app/admin/components/Common/Table";

export default async function HospitalTreatmentListPage() {
  const data = await prisma.hop_hospitaltreatment.findMany({
    where: { IsDeleted: false },
    include: {
      hop_hospital: {
        select: { HospitalName: true },
      },
      hop_treatmenttype: {
        select: { TreatmentTypeName: true },
      },
    },
  });

  const flattenedData = data.map((item) => ({
    ...item,
    HospitalName: item.hop_hospital.HospitalName,
    TreatmentTypeName: item.hop_treatmenttype.TreatmentTypeName,
  }));

  const autoColumns = generateColumns(flattenedData, [
    "IsDeleted",
    "hop_hospital",
    "hop_treatmenttype",
  ]);

  const columns: Column<(typeof flattenedData)[number]>[] = [
    ...autoColumns,
    {
      header: "Actions",
      isAction: true,
    },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Hospital Treatments"
        actionLabel="Add Hospital Treatment"
        actionUrl="/admin/components/hop/hospitaltreatment/add"
      />
      <div className="mb-6">
        <SearchBar />
      </div>
      <Table
        columns={columns}
        data={flattenedData}
        idKey="HospitalTreatmentID"
        basePath="/admin/components/hop/hospitaltreatment"
        moduleName="HospitalTreatment"
      />
    </div>
  );
}
