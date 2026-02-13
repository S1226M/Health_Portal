import React from "react";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { getColumns } from "../../../Common/columns";
import { SavePaymentMode } from "@/app/admin/modules/pay/paymentmode/action/SavePaymentMode";

export default async function AddPaymentModePage() {
  const columns = await getColumns("pay_paymentmode");
  return (
    <div className="p-6">
      <PageHeader
        title="Add PaymentMode"
        backUrl="/admin/components/pay/paymentmode"
      />
      <FormContainer
        action={SavePaymentMode}
        onCancelUrl="/admin/components/pay/paymentmode"
        columns={columns}
        skipFields={["PaymentModeID"]}
      />
    </div>
  );
}
