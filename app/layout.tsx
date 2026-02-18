import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "../app/user/components/common/Header";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // \u2705 CORRECT WAY
  // const cookieStore = await cookies();
  // const token = cookieStore.get("auth_token")?.value;
  // const isLogin = !!token;

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <Header isLogin={isLogin} /> */}
        {children}
      </body>
    </html>
  );
}
