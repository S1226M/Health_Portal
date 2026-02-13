import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../Common/columns";
import SaveRole from "@/app/admin/modules/sec/role/action/SaveRole";

export default async function AddRolePage() {
  const columns = await getColumns("sec_role");

  return (
    <>
      <PageHeader title="Add Role" backUrl="/admin/components/sec/role" />

      <FormContainer
        columns={columns}
        action={SaveRole}
        onCancelUrl="/admin/components/sec/role"
        skipFields={["RoleID"]}
      />
    </>
  );
}
