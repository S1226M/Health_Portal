'use client';

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface ViewBtnProps {
    viewUrl: string;
    id: number;
}

export default function ViewBtn({id,viewUrl}: ViewBtnProps){
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`${viewUrl}/${id}`)}
            className="text-red-500 hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-red-50"
            title="View Specialization" 
        >
            <Eye size={18} />
        </button>
    )
}