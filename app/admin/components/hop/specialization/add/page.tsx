// @/app/admin/components/hop/specialization/add/page.tsx
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import {getColumns} from '@/app/admin//components/Common/columns'
import { FormContainer, FormInput } from '../../../Common/Form';
import { SaveSpecialization } from '@/app/admin/modules/hop/specialization/action/SaveSpecialization';

    
export default async function AddSpecializationPage() {
    const columns = await getColumns('hop_specialization');
    const skipFields = ['SpecializationID', 'Created', 'Modified', 'IsDeleted', 'CreatedByUserID','ModifiedByUserID'];
    return (
        <div className="p-6">
            <PageHeader 
                title="Add Specialization" 
                backUrl="/admin/components/hop/specialization" 
            />
            <FormContainer action={SaveSpecialization} onCancelUrl="/admin/components/hop/specialization">
                    {columns
                    .filter(col => !skipFields.includes(col.COLUMN_NAME))
                    .map((col) => (
                        <FormInput 
                            key={col.COLUMN_NAME}   
                            label={col.COLUMN_NAME.replace(/([A-Z])/g, ' $1').trim()}
                            name={col.COLUMN_NAME}
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