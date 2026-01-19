
import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editDoctorReview from "@/app/admin/modules/hop/doctorreview/action/editDoctorReview";
import { notFound } from "next/navigation";

export default async function EditDoctorReviewPage({ params }: { params: Promise<{ doctorReviewID: string }> }) {
    const { doctorReviewID } = await params;
    const doctorReview = await prisma.hop_doctorreview.findUnique({
        where: { DoctorReviewID: parseInt(doctorReviewID) }
    });

    if (!doctorReview) notFound();

    const columns = await getColumns('hop_doctorreview');

    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    const patients = await prisma.hop_patient.findMany({
        where: { IsDeleted: false },
        select: { PatientID: true, PatientName: true }
    });

    const doctorOptions = doctors.map(d => ({
        label: d.DoctorName,
        value: d.DoctorID
    }));

    const patientOptions = patients.map(p => ({
        label: p.PatientName,
        value: p.PatientID
    }));

    // Serialize data to avoid passing Date objects to Client Component
    const serializedData = doctorReview ? JSON.parse(JSON.stringify(doctorReview)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Doctor Review Details Edit"
                backUrl="/admin/components/hop/doctorreview"
            />

            <FormContainer
                action={editDoctorReview}
                onCancelUrl="/admin/components/hop/doctorreview"
                columns={columns}
                skipFields={['DoctorReviewID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    DoctorID: doctorOptions,
                    PatientID: patientOptions
                }}
                initialData={serializedData}
            >
                <input type="hidden" name="DoctorReviewID" value={doctorReview?.DoctorReviewID} />
            </FormContainer>
        </div>
    )
}
