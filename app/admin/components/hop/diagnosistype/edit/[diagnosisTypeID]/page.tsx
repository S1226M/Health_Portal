
import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editDiagnosisType from "@/app/admin/modules/hop/diagnosistype/action/editDiagnosisType";
import { notFound } from "next/navigation";

export default async function EditDiagnosisTypePage({ params }: { params: Promise<{ diagnosisTypeID: string }> }) {
    const { diagnosisTypeID } = await params;
    const diagnosisType = await prisma.hop_diagnosistype.findUnique({
        where: { DiagnosisTypeID: parseInt(diagnosisTypeID) }
    });

    if (!diagnosisType) notFound();

    const columns = await getColumns('hop_diagnosistype');

    const hospitals = await prisma.hop_hospital.findMany({
        where: { IsDeleted: false },
        select: { HospitalID: true, HospitalName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const hospitalOptions = hospitals.map(h => ({
        label: h.HospitalName,
        value: h.HospitalID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    // Serialize data to avoid passing Date objects to Client Component
    const serializedData = diagnosisType ? JSON.parse(JSON.stringify(diagnosisType)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Diagnosis Type Details Edit"
                backUrl="/admin/components/hop/diagnosistype"
            />

            <FormContainer
                action={editDiagnosisType}
                onCancelUrl="/admin/components/hop/diagnosistype"
                columns={columns}
                skipFields={['DiagnosisTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    HospitalID: hospitalOptions,
                    UserID: userOptions
                }}
                initialData={serializedData}
            >
                <input type="hidden" name="DiagnosisTypeID" value={diagnosisType?.DiagnosisTypeID} />
            </FormContainer>
        </div>
    )
}
