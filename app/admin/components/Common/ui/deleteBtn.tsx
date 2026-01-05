"use client";

import { Trash2 } from "lucide-react";

interface DeleteBtnProps {
    id: number;
    deleteFn: (id: number) => Promise<void>;
}

export default function DeleteBtn({id,deleteFn}: DeleteBtnProps) {
  const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        
        if (confirmed) {
            try {
                await deleteFn(id);
                // Optionally add a toast success message here
            } catch (err) {
                alert("Failed to delete item.");
            }
        }
    };
  
    return (
        <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Delete Specialization"
        >
            <Trash2 size={18} />
        </button>
    );
}