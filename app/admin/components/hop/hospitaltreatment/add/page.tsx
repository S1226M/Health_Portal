import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormContainer } from "../../../Common/Form";
import SaveHospitalTreatment from "@/app/admin/modules/hop/hospitaltreatment/action/SaveHospitalTreatment";
import { PageHeader } from "../../../Common/PageHeader";

export default async function AddHospitalTreatmentPage() {
  const columns = await getColumns("hop_hospitaltreatment");

  const hospital = await prisma.hop_hospital.findMany({
    where: { IsDeleted: false },
  });
  const treatmentType = await prisma.hop_treatmenttype.findMany({
    where: { IsDeleted: false },
  });

  const selectOptions = {
    HospitalID: hospital.map((h) => ({
      label: h.HospitalName,
      value: h.HospitalID,
    })),
    TreatmentTypeID: treatmentType.map((t) => ({
      label: t.TreatmentTypeName,
      value: t.TreatmentTypeID,
    })),
  };

  return (
    <>
      <PageHeader
        title="Add Hospital Treatment"
        backUrl="/admin/components/hop/hospitaltreatment"
      />

      <FormContainer
        columns={columns}
        action={SaveHospitalTreatment}
        onCancelUrl="/admin/components/hop/hospitaltreatment"
        skipFields={["HospitalTreatmentID", "TreatmentTypeID"]}
        selectOptions={selectOptions}
      />
    </>
  );
}
