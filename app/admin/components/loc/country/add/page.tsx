import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { getColumns } from "../../../Common/columns";
import { SaveCountry } from "@/app/admin/modules/loc/country/action/SaveCountry";
import { FormContainer } from "../../../Common/Form";

export default async function AddCountryPage() {
  const columns = await getColumns("loc_country");
  return (
    <div className="p-6">
      <PageHeader title="Add Country" backUrl="/admin/components/loc/country" />
      <FormContainer
        action={SaveCountry}
        onCancelUrl="/admin/components/loc/country"
        columns={columns}
        skipFields={["CountryID"]}
      />
    </div>
  );
}
