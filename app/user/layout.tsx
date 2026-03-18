import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Health Portal – Your Trusted Healthcare Partner",
  description:
    "Book appointments, consult doctors, order medicines, and manage your health records. A premium healthcare platform for you and your family.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let isLogin = false;
  let userProfile = undefined;

  if (token) {
    const payload = verifyToken(token) as any;
    if (payload?.UserID) {
      const user = await prisma.sec_user.findUnique({
        where: { UserID: payload.UserID },
        select: {
          ProfileURL: true,
          FullName: true,
        },
      });

      if (user) {
        isLogin = true;
        userProfile = {
          profileUrl: user.ProfileURL,
          fullName: user.FullName,
        };
      }
    }
  }

  return (
    <>
      <Header isLogin={isLogin} userProfile={userProfile} />
      <div className={inter.variable}>{children}</div>
      <Footer />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
