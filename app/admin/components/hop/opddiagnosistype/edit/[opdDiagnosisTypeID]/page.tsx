import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editOPDDiagnosisType from "@/app/admin/modules/hop/opddiagnosistype/action/editOPDDiagnosisType";
import { notFound } from "next/navigation";

export default async function EditOPDDiagnosisTypePage({
  params,
}: {
  params: Promise<{ opdDiagnosisTypeID: string }>;
}) {
  const { opdDiagnosisTypeID } = await params;
  const opdDiagnosisType = await prisma.hop_opddiagnosistype.findUnique({
    where: { OPDDiagnosisTypeID: parseInt(opdDiagnosisTypeID) },
  });

  if (!opdDiagnosisType) notFound();

  const columns = await getColumns("hop_opddiagnosistype");

  const opds = await prisma.hop_opd.findMany({
    where: { IsDeleted: false },
    select: { OPDID: true, OPDDateTime: true },
  });

  const diagnosisTypes = await prisma.hop_diagnosistype.findMany({
    where: { IsDeleted: false },
    select: { DiagnosisTypeID: true, DiagnosisTypeName: true },
  });

  const users = await prisma.sec_user.findMany({
    where: { IsDeleted: false },
    select: { UserID: true, UserName: true },
  });

  const opdOptions = opds.map((o) => ({
    label: `${o.OPDID} - ${new Date(o.OPDDateTime).toLocaleDateString()}`,
    value: o.OPDID,
  }));

  const diagnosisTypeOptions = diagnosisTypes.map((d) => ({
    label: d.DiagnosisTypeName,
    value: d.DiagnosisTypeID,
  }));

  const userOptions = users.map((u) => ({
    label: u.UserName,
    value: u.UserID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedData = opdDiagnosisType
    ? JSON.parse(JSON.stringify(opdDiagnosisType))
    : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="OPD Diagnosis Type Details Edit"
        backUrl="/admin/components/hop/opddiagnosistype"
      />

      <FormContainer
        action={editOPDDiagnosisType}
        onCancelUrl="/admin/components/hop/opddiagnosistype"
        columns={columns}
        skipFields={[
          "OPDDiagnosisTypeID",
          "Created",
          "Modified",
          "CreatedByUserID",
          "ModifiedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          OPDID: opdOptions,
          DiagnosisTypeID: diagnosisTypeOptions,
          UserID: userOptions,
        }}
        initialData={serializedData}
      >
        <input
          type="hidden"
          name="OPDDiagnosisTypeID"
          value={opdDiagnosisType?.OPDDiagnosisTypeID}
        />
      </FormContainer>
    </div>
  );
}
