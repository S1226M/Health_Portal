"use client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface editBtnProps {
    viewUrl: string;
    id: number;

}

export default function EditBtn({id,viewUrl}: editBtnProps){
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`${viewUrl}/${id}`)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-md hover:bg-blue-50"
            title="Edit Specialization"
        >
            <Pencil size={18} />
        </button>
    )

}