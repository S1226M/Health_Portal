import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editDoctor from "@/app/admin/modules/hop/doctor/action/editDoctor";
import { notFound } from "next/navigation";

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ doctorID: string }>;
}) {
  const { doctorID } = await params;
  const doctor = await prisma.hop_doctor.findUnique({
    where: { DoctorID: parseInt(doctorID) },
  });

  if (!doctor) notFound();

  const columns = await getColumns("hop_doctor");

  const hospitals = await prisma.hop_hospital.findMany({
    where: { IsDeleted: false },
    select: { HospitalID: true, HospitalName: true },
  });

  const specializations = await prisma.hop_specialization.findMany({
    where: { IsDeleted: false },
    select: { SpecializationID: true, SpecializationName: true },
  });

  const users = await prisma.sec_user.findMany({
    where: { IsDeleted: false },
    select: { UserID: true, UserName: true },
  });

  const hospitalOptions = hospitals.map((h) => ({
    label: h.HospitalName,
    value: h.HospitalID,
  }));

  const specializationOptions = specializations.map((s) => ({
    label: s.SpecializationName,
    value: s.SpecializationID,
  }));

  const userOptions = users.map((u) => ({
    label: u.UserName,
    value: u.UserID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedDoctor = doctor ? JSON.parse(JSON.stringify(doctor)) : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Doctor Details Edit"
        backUrl="/admin/components/hop/doctor"
      />

      <FormContainer
        action={editDoctor}
        onCancelUrl="/admin/components/hop/doctor"
        columns={columns}
        skipFields={[
          "DoctorID",
          "Created",
          "Modified",
          "CreatedByUserID",
          "ModifiedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          HospitalID: hospitalOptions,
          SpecializationID: specializationOptions,
          UserID: userOptions,
        }}
        initialData={serializedDoctor}
      >
        <input type="hidden" name="DoctorID" value={doctor?.DoctorID} />
      </FormContainer>
    </div>
  );
}
