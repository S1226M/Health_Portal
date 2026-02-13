import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import editPaymentMode from "@/app/admin/modules/pay/paymentmode/action/editPaymentMode";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PaymentModeEdit({
  params,
}: {
  params: Promise<{ paymentmodeID: string }>;
}) {
  const { paymentmodeID } = await params;
  const paymentMode = await prisma.pay_paymentmode.findUnique({
    where: { PaymentModeID: parseInt(paymentmodeID) },
  });

  if (!paymentmodeID) {
    notFound();
  }

  const skipFields = [
    "Created",
    "Modified",
    "IsDeleted",
    "CreatedByUserID",
    "ModifiedByUserID",
  ];
  const columns = await getColumns("pay_paymentmode");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="PaymentMode Details Edit"
        backUrl="/admin/components/pay/paymentmode"
      />

      <FormContainer
        action={editPaymentMode}
        onCancelUrl="/admin/components/pay/paymentmode"
        columns={columns}
        skipFields={skipFields}
        initialData={paymentMode}
      >
        <input
          type="hidden"
          name="PaymentMode"
          value={paymentMode?.PaymentModeID}
        />
      </FormContainer>
    </div>
  );
}
