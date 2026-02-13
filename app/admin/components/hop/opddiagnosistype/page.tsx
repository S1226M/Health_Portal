import React from "react";
import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";
import { Column } from "@/app/admin/components/Common/Table";

export default async function OPDDiagnosisTypeListPage() {
  const data = await prisma.hop_opddiagnosistype.findMany({
    where: { IsDeleted: false },
    include: {
      hop_opd: {
        select: { OPDID: true, OPDDateTime: true }, // Showing ID and Date
      },
      hop_diagnosistype: {
        select: { DiagnosisTypeName: true },
      },
    },
  });

  const flattenedData = data.map((item) => ({
    ...item,
    OPDInfo: `${item.hop_opd.OPDID} - ${new Date(item.hop_opd.OPDDateTime).toLocaleDateString()}`,
    DiagnosisTypeName: item.hop_diagnosistype.DiagnosisTypeName,
  }));

  const autoColumns = generateColumns(flattenedData, [
    "IsDeleted",
    "hop_opd",
    "hop_diagnosistype",
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
        title="OPD Diagnosis Types"
        actionLabel="Add OPD Diagnosis Type"
        actionUrl="/admin/components/hop/opddiagnosistype/add"
      />
      <div className="mb-6">
        <SearchBar />
      </div>
      <Table
        columns={columns}
        data={flattenedData}
        idKey="OPDDiagnosisTypeID"
        basePath="/admin/components/hop/opddiagnosistype"
        moduleName="OPDDiagnosisType"
      />
    </div>
  );
}
