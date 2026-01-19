
import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editAppointment from "@/app/admin/modules/hop/appointment/action/editAppointment";
import { notFound } from "next/navigation";

export default async function EditAppointmentPage({ params }: { params: Promise<{ appointmentID: string }> }) {
    const { appointmentID } = await params;
    const appointment = await prisma.hop_appointment.findUnique({
        where: { AppointmentID: parseInt(appointmentID) }
    });

    if (!appointment) notFound();

    const columns = await getColumns('hop_appointment');

    const patients = await prisma.hop_patient.findMany({
        where: { IsDeleted: false },
        select: { PatientID: true, PatientName: true }
    });

    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    const patientOptions = patients.map(p => ({
        label: p.PatientName,
        value: p.PatientID
    }));

    const doctorOptions = doctors.map(d => ({
        label: d.DoctorName,
        value: d.DoctorID
    }));

    // Serialize data to avoid passing Date objects to Client Component
    const serializedAppointment = appointment ? JSON.parse(JSON.stringify(appointment)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Appointment Details Edit"
                backUrl="/admin/components/hop/appointment"
            />

            <FormContainer
                action={editAppointment}
                onCancelUrl="/admin/components/hop/appointment"
                columns={columns}
                skipFields={['AppointmentID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    PatientID: patientOptions,
                    DoctorID: doctorOptions
                }}
                initialData={serializedAppointment}
            >
                <input type="hidden" name="AppointmentID" value={appointment?.AppointmentID} />
            </FormContainer>
        </div>
    )
}
