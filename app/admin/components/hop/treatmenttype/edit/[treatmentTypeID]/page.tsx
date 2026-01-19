
import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editTreatmentType from "@/app/admin/modules/hop/treatmenttype/action/editTreatmentType";
import { notFound } from "next/navigation";

export default async function EditTreatmentTypePage({ params }: { params: Promise<{ treatmentTypeID: string }> }) {
    const { treatmentTypeID } = await params;
    const treatmentType = await prisma.hop_treatmenttype.findUnique({
        where: { TreatmentTypeID: parseInt(treatmentTypeID) }
    });

    if (!treatmentType) notFound();

    const columns = await getColumns('hop_treatmenttype');

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    // Serialize data to avoid passing Date objects to Client Component
    const serializedData = treatmentType ? JSON.parse(JSON.stringify(treatmentType)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Treatment Type Details Edit"
                backUrl="/admin/components/hop/treatmenttype"
            />

            <FormContainer
                action={editTreatmentType}
                onCancelUrl="/admin/components/hop/treatmenttype"
                columns={columns}
                skipFields={['TreatmentTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    UserID: userOptions
                }}
                initialData={serializedData}
            >
                <input type="hidden" name="TreatmentTypeID" value={treatmentType?.TreatmentTypeID} />
            </FormContainer>
        </div>
    )
}
