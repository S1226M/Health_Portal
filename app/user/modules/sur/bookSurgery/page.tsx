import React, { Suspense } from "react";
import BookSurgeryClient from "./BookSurgeryClient";
import { CircularProgress } from "@mui/material";

export const metadata = {
    title: "Request Surgery - Health Portal",
};

export default function BookSurgeryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-industrial-50"><CircularProgress /></div>}>
            <BookSurgeryClient />
        </Suspense>
    );
}
