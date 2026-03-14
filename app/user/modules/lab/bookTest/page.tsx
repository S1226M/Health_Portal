import React, { Suspense } from "react";
import BookLabTestClient from "./BookLabTestClient";
import { CircularProgress } from "@mui/material";

export const metadata = {
    title: "Book Test - Health Portal",
};

export default function BookLabTestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-industrial-50"><CircularProgress /></div>}>
            <BookLabTestClient />
        </Suspense>
    );
}
