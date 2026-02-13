import React from "react";
import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table, Column } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";

export default async function CountryListPage() {
  const data = await prisma.loc_country.findMany({
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
        title="Countries"
        actionLabel="Add Country"
        actionUrl="/admin/components/loc/country/add"
      />

      <div className="mb-6">
        <SearchBar />
      </div>

      <Table
        columns={columns}
        data={data}
        idKey="CountryID"
        basePath="/admin/components/loc/country"
        moduleName="Country"
      />
    </div>
  );
}
