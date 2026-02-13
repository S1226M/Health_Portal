import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editPatient from "@/app/admin/modules/hop/patient/action/editPatient";
import { notFound } from "next/navigation";

export default async function EditPatientPage({
  params,
}: {
  params: Promise<{ patientID: string }>;
}) {
  const { patientID } = await params;
  const patient = await prisma.hop_patient.findUnique({
    where: { PatientID: parseInt(patientID) },
  });

  if (!patient) notFound();

  const columns = await getColumns("hop_patient");

  const cities = await prisma.loc_city.findMany({
    where: { IsDeleted: false },
    select: { CityID: true, CityName: true },
  });

  const users = await prisma.sec_user.findMany({
    where: { IsDeleted: false },
    select: { UserID: true, UserName: true },
  });

  const cityOptions = cities.map((c) => ({
    label: c.CityName,
    value: c.CityID,
  }));

  const userOptions = users.map((u) => ({
    label: u.UserName,
    value: u.UserID,
  }));

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const bloodGroupOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  // Serialize data to avoid passing Date objects to Client Component
  const serializedPatient = patient
    ? JSON.parse(JSON.stringify(patient))
    : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Patient Details Edit"
        backUrl="/admin/components/hop/patient"
      />

      <FormContainer
        action={editPatient}
        onCancelUrl="/admin/components/hop/patient"
        columns={columns}
        skipFields={[
          "PatientID",
          "Created",
          "Modified",
          "CreatedByUserID",
          "ModifiedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          CityID: cityOptions,
          UserID: userOptions,
          Gender: genderOptions,
          BloodGroup: bloodGroupOptions,
        }}
        initialData={serializedPatient}
      >
        <input type="hidden" name="PatientID" value={patient?.PatientID} />
      </FormContainer>
    </div>
  );
}
