import React from "react";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { PageHeader } from "../../../Common/PageHeader";
import { FormContainer } from "../../../Common/Form";
import SaveMedicineOrderPaymentType from "@/app/admin/modules/phm/medicineorderpaymenttype/action/SaveMedicineOrderPaymentType";

export default async function AddMedicineOrderPaymentTypePage() {
  const columns = await getColumns("phm_medicineorderpaymenttype");

  const medicineOrderPaymentTypes =
    await prisma.phm_medicineorderpaymenttype.findMany({
      where: { IsDeleted: false },
    });

  const selectOptions = {
    ParentPaymentTypeID: medicineOrderPaymentTypes.map((m) => ({
      label: m.MedicineOrderPaymentTypeName,
      value: m.MedicineOrderPaymentTypeID,
    })),
  };

  return (
    <>
      <PageHeader
        title="Add Medicine Order Payment Type"
        backUrl="/admin/components/phm/medicineorderpaymenttype"
      />

      <FormContainer
        columns={columns}
        action={SaveMedicineOrderPaymentType}
        onCancelUrl="/admin/components/phm/medicineorderpaymenttype"
        skipFields={["MedicineOrderPaymentTypeID"]}
        selectOptions={selectOptions}
      />
    </>
  );
}
