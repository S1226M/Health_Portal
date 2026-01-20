import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editSurgeryBooking from "@/app/admin/modules/sur/surgerybooking/action/editSurgeryBooking";
import { notFound } from "next/navigation";

export default async function EditSurgeryBookingPage({ params }: { params: Promise<{ surgeryBookingID: string }> }) {
    const { surgeryBookingID } = await params;
    const data = await prisma.sur_surgerybooking.findUnique({
        where: { SurgeryBookingID: parseInt(surgeryBookingID) }
    });

    if (!data) notFound();

    const columns = await getColumns('sur_surgerybooking');

    const surgeries = await prisma.sur_surgery.findMany({ where: { IsDeleted: false } });
    const patients = await prisma.hop_patient.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        SurgeryID: surgeries.map(s => ({ label: s.SurgeryName, value: s.SurgeryID })),
        PatientID: patients.map(p => ({ label: p.PatientName, value: p.PatientID }))
    };

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Booking"
                backUrl="/admin/components/sur/surgerybooking"
            />

            <FormContainer
                action={editSurgeryBooking}
                onCancelUrl="/admin/components/sur/surgerybooking"
                columns={columns}
                skipFields={['SurgeryBookingID']}
                selectOptions={selectOptions}
                initialData={serializedData}
            >
                <input type="hidden" name="SurgeryBookingID" value={data?.SurgeryBookingID} />
            </FormContainer>
        </div>
    )
}
