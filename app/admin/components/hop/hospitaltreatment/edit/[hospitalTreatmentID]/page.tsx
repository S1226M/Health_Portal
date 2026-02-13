import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editHospitalTreatment from "@/app/admin/modules/hop/hospitaltreatment/action/editHospitalTreatment";
import { notFound } from "next/navigation";

export default async function EditHospitalTreatmentPage({
  params,
}: {
  params: Promise<{ hospitalTreatmentID: string }>;
}) {
  const { hospitalTreatmentID } = await params;
  const hospitalTreatment = await prisma.hop_hospitaltreatment.findUnique({
    where: { HospitalTreatmentID: parseInt(hospitalTreatmentID) },
  });

  if (!hospitalTreatment) notFound();

  const columns = await getColumns("hop_hospitaltreatment");

  const hospitals = await prisma.hop_hospital.findMany({
    where: { IsDeleted: false },
    select: { HospitalID: true, HospitalName: true },
  });

  const treatmentTypes = await prisma.hop_treatmenttype.findMany({
    where: { IsDeleted: false },
    select: { TreatmentTypeID: true, TreatmentTypeName: true },
  });

  const hospitalOptions = hospitals.map((h) => ({
    label: h.HospitalName,
    value: h.HospitalID,
  }));

  const treatmentTypeOptions = treatmentTypes.map((t) => ({
    label: t.TreatmentTypeName,
    value: t.TreatmentTypeID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedData = hospitalTreatment
    ? JSON.parse(JSON.stringify(hospitalTreatment))
    : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Hospital Treatment Details Edit"
        backUrl="/admin/components/hop/hospitaltreatment"
      />

      <FormContainer
        action={editHospitalTreatment}
        onCancelUrl="/admin/components/hop/hospitaltreatment"
        columns={columns}
        skipFields={["HospitalTreatmentID", "IsDeleted"]}
        selectOptions={{
          HospitalID: hospitalOptions,
          TreatmentTypeID: treatmentTypeOptions,
        }}
        initialData={serializedData}
      >
        <input
          type="hidden"
          name="HospitalTreatmentID"
          value={hospitalTreatment?.HospitalTreatmentID}
        />
      </FormContainer>
    </div>
  );
}
