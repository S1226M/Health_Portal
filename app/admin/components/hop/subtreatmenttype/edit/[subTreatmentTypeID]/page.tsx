
import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editSubTreatmentType from "@/app/admin/modules/hop/subtreatmenttype/action/editSubTreatmentType";
import { notFound } from "next/navigation";

export default async function EditSubTreatmentTypePage({ params }: { params: Promise<{ subTreatmentTypeID: string }> }) {
    const { subTreatmentTypeID } = await params;
    const subTreatmentType = await prisma.hop_subtreatmenttype.findUnique({
        where: { SubTreatmentTypeID: parseInt(subTreatmentTypeID) }
    });

    if (!subTreatmentType) notFound();

    const columns = await getColumns('hop_subtreatmenttype');

    const treatmentTypes = await prisma.hop_treatmenttype.findMany({
        where: { IsDeleted: false },
        select: { TreatmentTypeID: true, TreatmentTypeName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const treatmentTypeOptions = treatmentTypes.map(t => ({
        label: t.TreatmentTypeName,
        value: t.TreatmentTypeID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    // Serialize data to avoid passing Date objects to Client Component
    const serializedData = subTreatmentType ? JSON.parse(JSON.stringify(subTreatmentType)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Sub Treatment Type Details Edit"
                backUrl="/admin/components/hop/subtreatmenttype"
            />

            <FormContainer
                action={editSubTreatmentType}
                onCancelUrl="/admin/components/hop/subtreatmenttype"
                columns={columns}
                skipFields={['SubTreatmentTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    TreatmentTypeID: treatmentTypeOptions,
                    UserID: userOptions
                }}
                initialData={serializedData}
            >
                <input type="hidden" name="SubTreatmentTypeID" value={subTreatmentType?.SubTreatmentTypeID} />
            </FormContainer>
        </div>
    )
}
