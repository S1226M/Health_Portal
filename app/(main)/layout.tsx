import type React from "react";
import Header from "../user/components/common/Header";
import Footer from "../user/components/common/Footer";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function MainLayout({
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
      {children}
      <Footer />
    </>
  );
}
