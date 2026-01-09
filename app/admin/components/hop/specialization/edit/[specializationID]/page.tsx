import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer, FormInput } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import editSpecialization from "@/app/admin/modules/hop/specialization/action/editSpecialization";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";



export default async function SpecializationEdit({ params }: { params: Promise<{ specializationID: string }> }){
    const { specializationID } = await params;
    const specialization = await prisma.hop_specialization.findUnique({
        where: { SpecializationID: parseInt(specializationID) }
    });

    if (!specialization) {
        return notFound();
    }
    
    const skipFields = ['SpecializationID', 'Created', 'Modified', 'IsDeleted','CreatedByUserID','ModifiedByUserID'];
    const columns = await getColumns('hop_specialization');
    console.log(columns);
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
          <PageHeader 
            title="Specialization Details Edit" 
            backUrl="/admin/components/hop/specialization" 
          />
          
          <FormContainer action={editSpecialization} onCancelUrl="/admin/components/hop/specialization">
            <input type="hidden" name="SpecializationID" value={specialization?.SpecializationID} />
              {columns
              .filter(col => !skipFields.includes(col.COLUMN_NAME))
              .map((col) => (
                  <FormInput 
                      key={col.COLUMN_NAME}   
                      label={col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim()}
                      name={col.COLUMN_NAME}
                      defaultValue={(specialization as any)[col.COLUMN_NAME] ?? ""}
                      required={col.IS_NULLABLE === 'NO'}
                      isTextArea={col.COLUMN_NAME.toLowerCase().includes('description')}
                      fullWidth={col.COLUMN_NAME.toLowerCase().includes('description')}
                      placeholder={`Enter ${col.COLUMN_NAME}...`}
                  />
              ))
            }
            </FormContainer>
        </div>
    );

}