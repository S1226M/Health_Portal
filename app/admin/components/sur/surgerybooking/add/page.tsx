import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../Common/columns";
import { prisma } from "@/lib/prisma";
import SaveSurgeryBooking from "@/app/admin/modules/sur/surgerybooking/action/SaveSurgeryBooking";

export default async function AddSurgeryBookingPage() {
  const columns = await getColumns("sur_surgerybooking");

  const surgeries = await prisma.sur_surgery.findMany({
    where: { IsDeleted: false },
  });
  const patients = await prisma.hop_patient.findMany({
    where: { IsDeleted: false },
  });
  const hospitals = await prisma.hop_hospital.findMany({
    where: { IsDeleted: false },
  });

  const selectOptions = {
    SurgeryID: surgeries.map((s) => ({
      label: s.SurgeryName,
      value: s.SurgeryID,
    })),
    PatientID: patients.map((p) => ({
      label: p.PatientName,
      value: p.PatientID,
    })),
    HospitalID: hospitals.map((h) => ({
      label: h.HospitalName,
      value: h.HospitalID,
    })),
  };

  return (
    <>
      <PageHeader
        title="Add Booking"
        backUrl="/admin/components/sur/surgerybooking"
      />

      <FormContainer
        columns={columns}
        action={SaveSurgeryBooking}
        onCancelUrl="/admin/components/sur/surgerybooking"
        skipFields={["SurgeryBookingID"]}
        selectOptions={selectOptions}
      />
    </>
  );
}
