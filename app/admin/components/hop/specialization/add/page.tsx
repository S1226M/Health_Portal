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
            <FormContainer 
                action={SaveSpecialization} 
                onCancelUrl="/admin/components/loc/country"
                columns={columns}
                skipFields={['SpecializationID']}
            />
        </div>
   );
}