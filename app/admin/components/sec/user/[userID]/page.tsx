import { notFound } from "next/navigation";
import { getColumns } from "../../../Common/columns";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../Common/PageHeader";
import { ViewTable } from "../../../Common/commonViewTable";
import { FormattedColumns } from "../../../Common/formatedColumns";

interface PageProps {
    params: Promise<{ userID: string }>;
}
export default async function UserDetailPage({params}:PageProps) {
    const { userID } = await params;
    const id = Number(userID);
    
    if (isNaN(id)) notFound();

    const [rawColumns, subTreatmentType] = await Promise.all([
        getColumns('sec_user'),
        prisma.sec_user.findFirst({
            where: { UserID: id }
        })
    ]);

    if (!subTreatmentType) notFound();

    const formattedColumns = FormattedColumns(rawColumns);
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="User Details"
                backUrl="/admin/components/sec/user"
            />
            <ViewTable
                columns={formattedColumns}
                data={subTreatmentType}
            />  
        </div>
    );
}