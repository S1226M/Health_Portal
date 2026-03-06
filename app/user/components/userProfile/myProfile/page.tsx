import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User, Mail, Phone, Calendar, Shield, Edit, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function MyProfilePage() {
    // 1. Authenticate and retrieve user data securely on the server
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return (
            <div className="min-h-screen bg-industrial-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-industrial-200 text-center max-w-md w-full">
                    <Shield className="w-12 h-12 text-industrial-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-industrial-900 mb-2">Authentication Required</h2>
                    <p className="text-industrial-500 mb-6 font-medium">Please log in to view and manage your profile.</p>
                    <Link href="/auth/login" className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-semibold transition-colors w-full">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    const payload = verifyToken(token) as any;
    if (!payload?.UserID) {
        return <div className="p-8 text-center text-red-500 font-bold">Invalid session.</div>;
    }

    const user = await prisma.sec_user.findUnique({
        where: { UserID: payload.UserID },
        include: {
            sec_role_sec_user_RoleIDTosec_role: true,
        }
    });

    if (!user) {
        return <div className="p-8 text-center text-red-500 font-bold">User account not found.</div>;
    }

    // Prepare display variables
    const profileImageSrc = user.ProfileURL || "/profile.svg";
    const userRole = user.sec_role_sec_user_RoleIDTosec_role?.RoleName || "Patient";
    const joinDate = user.Created ? new Date(user.Created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently";

    return (
        <div className="min-h-screen bg-industrial-50 font-sans text-industrial-900 pb-24">
            {/* Header Area */}
            <div className="bg-white border-b border-industrial-200 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="container max-w-5xl mx-auto px-6 relative z-10 animate-slideUpFade">
                    <div className="flex items-center gap-2 text-industrial-500 mb-4 text-[13px] font-bold tracking-widest uppercase">
                        <User className="w-4 h-4" />
                        <span>Account Overview</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-industrial-900 tracking-tight">
                        My Profile
                    </h1>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container max-w-5xl mx-auto px-6 -mt-6 relative z-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Avatar & Quick Actions */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg p-8 shadow-sm border border-industrial-200 flex flex-col items-center text-center">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-industrial-50 shadow-md overflow-hidden bg-industrial-100 flex items-center justify-center relative z-10">
                                    {/* Try to use next/image, fallback to img if external domain isn't in next.config.js */}
                                    <img
                                        src={profileImageSrc}
                                        alt={user.FullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full border border-industrial-200 shadow-md text-industrial-600 hover:text-primary-600 hover:border-primary-600 transition-colors z-20 group-hover:scale-105">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-industrial-900 mb-1">{user.FullName}</h2>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 text-[12px] font-bold tracking-wide uppercase rounded-[4px] border border-primary-100">
                                <Shield className="w-3.5 h-3.5" />
                                {userRole}
                            </span>
                        </div>

                        {/* Settings Nav Area */}
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-industrial-200 flex flex-col">
                            <Link href="/user/components/userProfile/myProfile" className="flex items-center gap-3 px-4 py-3 rounded-md bg-industrial-50 text-primary-600 font-bold text-[14px] transition-colors">
                                <User className="w-4 h-4" />
                                Personal Information
                            </Link>
                            {/* Decorative placeholders to make it look full */}
                            <button className="flex items-center gap-3 px-4 py-3 rounded-md text-industrial-600 hover:bg-industrial-50 hover:text-industrial-900 font-bold text-[14px] transition-colors text-left w-full cursor-not-allowed opacity-60">
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg p-8 shadow-sm border border-industrial-200">
                            <div className="flex items-center justify-between mb-8 border-b border-industrial-100 pb-4">
                                <h3 className="text-xl font-bold text-industrial-900 tracking-tight">Personal Details</h3>
                                <button className="flex items-center gap-2 text-[13px] font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wide transition-colors">
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                                {/* Field: Full Name */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-industrial-400 uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Full Name
                                    </label>
                                    <div className="text-[15px] font-semibold text-industrial-900">
                                        {user.FullName}
                                    </div>
                                </div>

                                {/* Field: User Name (System ID) */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-industrial-400 uppercase tracking-wider flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5" /> Username
                                    </label>
                                    <div className="text-[15px] font-semibold text-industrial-900">
                                        {user.UserName}
                                    </div>
                                </div>

                                {/* Field: Email */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-industrial-400 uppercase tracking-wider flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" /> Email Address
                                    </label>
                                    <div className="text-[15px] font-semibold text-industrial-900">
                                        {user.Email || <span className="text-industrial-400 italic font-medium">Not provided</span>}
                                    </div>
                                </div>

                                {/* Field: Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-industrial-400 uppercase tracking-wider flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" /> Phone Number
                                    </label>
                                    <div className="text-[15px] font-semibold text-industrial-900">
                                        {user.MobileNo || <span className="text-industrial-400 italic font-medium">Not provided</span>}
                                    </div>
                                </div>

                                {/* Field: Member Since */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-industrial-400 uppercase tracking-wider flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" /> Member Since
                                    </label>
                                    <div className="text-[15px] font-semibold text-industrial-900">
                                        {joinDate}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-industrial-200">
                                <h4 className="text-[14px] font-bold text-industrial-900 mb-2">Password & Security</h4>
                                <p className="text-[13px] text-industrial-500 font-medium mb-4">Manage your password and security preferences.</p>
                                <button className="w-full text-center py-2 bg-industrial-50 hover:bg-industrial-100 text-industrial-700 rounded-md text-[13px] font-bold transition-colors border border-industrial-200">
                                    Change Password
                                </button>
                            </div>
                            <div className="bg-primary-900 rounded-lg p-6 shadow-sm border border-primary-800 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                <h4 className="text-[14px] font-bold text-white/90 mb-2 relative z-10">Medical Records</h4>
                                <p className="text-[13px] text-primary-200 font-medium mb-4 relative z-10">Access your historical appointment and lab data.</p>
                                <button className="w-full text-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-[13px] font-bold transition-colors border border-white/10 relative z-10">
                                    View Records
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}