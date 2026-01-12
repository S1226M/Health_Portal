import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer, FormInput } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import editSpecialization from "@/app/admin/modules/hop/specialization/action/editSpecialization";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SpecializationEdit({ params }: { params: Promise<{ specializationID: string }> }) {
    const { specializationID } = await params;
    const specialization = await prisma.hop_specialization.findUnique({
        where: { SpecializationID: parseInt(specializationID) }
    });

    if (!specialization) {
        return notFound();
    }

    const skipFields = ['SpecializationID', 'Created', 'Modified', 'IsDeleted', 'CreatedByUserID', 'ModifiedByUserID'];
    const columns = await getColumns('hop_specialization');

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Specialization Details Edit"
                backUrl="/admin/components/hop/specialization"
            />

            <FormContainer
                action={editSpecialization}
                onCancelUrl="/admin/components/hop/specialization"
                columns={columns}
                skipFields={skipFields}
                initialData={specialization}
            >
                <input type="hidden" name="SpecializationID" value={specialization?.SpecializationID} />
            </FormContainer>
        </div>
    );

}