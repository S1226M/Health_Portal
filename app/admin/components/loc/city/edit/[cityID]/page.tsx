import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editCityAction from "@/app/admin/modules/loc/city/action/editCity";
import { notFound } from "next/navigation";

export default async function editCity({
  params,
}: {
  params: Promise<{ cityID: string }>;
}) {
  const { cityID } = await params;
  const city = await prisma.loc_city.findUnique({
    where: { CityID: parseInt(cityID) },
  });

  if (!city) notFound();

  const columns = await getColumns("loc_city");

  const cities = await prisma.loc_state.findMany({
    where: { IsDeleted: false },
    select: { StateID: true, StateName: true },
  });

  const stateOptions = cities.map((c) => ({
    label: c.StateName,
    value: c.StateID,
  }));

  // Serialize data to avoid passing Date objects to Client Component
  const serializedCity = city ? JSON.parse(JSON.stringify(city)) : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="City Details Edit"
        backUrl="/admin/components/loc/city"
      />

      <FormContainer
        action={editCityAction}
        onCancelUrl="/admin/components/loc/city"
        columns={columns}
        skipFields={["CityID"]}
        selectOptions={{ StateID: stateOptions }}
        initialData={serializedCity}
      >
        <input type="hidden" name="CityID" value={city?.CityID} />
      </FormContainer>
    </div>
  );
}
