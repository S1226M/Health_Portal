import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editOPD from "@/app/admin/modules/hop/opd/action/editOPD";
import { notFound } from "next/navigation";

export default async function EditOPDPage({
  params,
}: {
  params: Promise<{ opdID: string }>;
}) {
  const { opdID } = await params;
  const opd = await prisma.hop_opd.findUnique({
    where: { OPDID: parseInt(opdID) },
  });

  if (!opd) notFound();

  const columns = await getColumns("hop_opd");

  const patients = await prisma.hop_patient.findMany({
    where: { IsDeleted: false },
    select: { PatientID: true, PatientName: true },
  });

  const doctors = await prisma.hop_doctor.findMany({
    where: { IsDeleted: false },
    select: { DoctorID: true, DoctorName: true },
  });

  const diagnosisTypes = await prisma.hop_diagnosistype.findMany({
    where: { IsDeleted: false },
    select: { DiagnosisTypeID: true, DiagnosisTypeName: true },
  });

  const appointments = await prisma.hop_appointment.findMany({
    where: { IsDeleted: false },
    select: { AppointmentID: true, AppointmentDate: true },
  });

  const users = await prisma.sec_user.findMany({
    where: { IsDeleted: false },
    select: { UserID: true, UserName: true },
  });

  const patientOptions = patients.map((p) => ({
    label: p.PatientName,
    value: p.PatientID,
  }));

  const doctorOptions = doctors.map((d) => ({
    label: d.DoctorName,
    value: d.DoctorID,
  }));

  const diagnosisTypeOptions = diagnosisTypes.map((d) => ({
    label: d.DiagnosisTypeName,
    value: d.DiagnosisTypeID,
  }));

  const appointmentOptions = appointments.map((a) => ({
    label: `${a.AppointmentID} - ${a.AppointmentDate}`,
    value: a.AppointmentID,
  }));

  const userOptions = users.map((u) => ({
    label: u.UserName,
    value: u.UserID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedData = opd ? JSON.parse(JSON.stringify(opd)) : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="OPD Details Edit"
        backUrl="/admin/components/hop/opd"
      />

      <FormContainer
        action={editOPD}
        onCancelUrl="/admin/components/hop/opd"
        columns={columns}
        skipFields={[
          "OPDID",
          "Created",
          "Modified",
          "CreatedByUserID",
          "ModifiedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          PatientID: patientOptions,
          TreatedByDoctorID: doctorOptions,
          DiagnosisTypeID: diagnosisTypeOptions,
          AppointmentID: appointmentOptions,
          UserID: userOptions,
        }}
        initialData={serializedData}
      >
        <input type="hidden" name="OPDID" value={opd?.OPDID} />
      </FormContainer>
    </div>
  );
}
