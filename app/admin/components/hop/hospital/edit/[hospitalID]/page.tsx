import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editHospital from "@/app/admin/modules/hop/hospital/action/editHospital";
import { notFound } from "next/navigation";

export default async function EditHospitalPage({
  params,
}: {
  params: Promise<{ hospitalID: string }>;
}) {
  const { hospitalID } = await params;
  const hospital = await prisma.hop_hospital.findUnique({
    where: { HospitalID: parseInt(hospitalID) },
  });

  if (!hospital) notFound();

  const columns = await getColumns("hop_hospital");

  const paymentModes = await prisma.pay_paymentmode.findMany({
    where: { IsDeleted: false },
    select: { PaymentModeID: true, PaymentModeName: true },
  });

  const cities = await prisma.loc_city.findMany({
    where: { IsDeleted: false },
    select: { CityID: true, CityName: true },
  });

  const users = await prisma.sec_user.findMany({
    where: { IsDeleted: false },
    select: { UserID: true, UserName: true },
  });

  const paymentModeOptions = paymentModes.map((p) => ({
    label: p.PaymentModeName,
    value: p.PaymentModeID,
  }));

  const cityOptions = cities.map((c) => ({
    label: c.CityName,
    value: c.CityID,
  }));

  const userOptions = users.map((u) => ({
    label: u.UserName,
    value: u.UserID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedHospital = hospital
    ? JSON.parse(JSON.stringify(hospital))
    : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Hospital Details Edit"
        backUrl="/admin/components/hop/hospital"
      />

      <FormContainer
        action={editHospital}
        onCancelUrl="/admin/components/hop/hospital"
        columns={columns}
        skipFields={[
          "HospitalID",
          "Created",
          "Modified",
          "CreatedByUserID",
          "ModifiedByUserID",
          "IsDeleted",
        ]}
        selectOptions={{
          DefaultPaymentModeID: paymentModeOptions,
          CityID: cityOptions,
          UserID: userOptions,
        }}
        initialData={serializedHospital}
      >
        <input type="hidden" name="HospitalID" value={hospital?.HospitalID} />
      </FormContainer>
    </div>
  );
}
