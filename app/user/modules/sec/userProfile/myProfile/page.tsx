import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User, Mail, Phone, Calendar, Shield, Edit, Settings, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function MyProfilePage() {
    // 1. Authenticate and retrieve user data securely on the server
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulseGlow" />

                <div className="bg-white/80 p-10 rounded-[1.5rem] shadow-xl border border-slate-200 text-center max-w-md w-full glass animate-scaleIn relative z-10">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Shield className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">Authentication Required</h2>
                    <p className="text-slate-500 mb-8 font-medium">Please log in to view and manage your profile securely.</p>
                    <Link href="/auth/login" className="inline-flex items-center justify-center px-8 py-3.5 gradient-primary hover:shadow-lg text-white rounded-xl font-bold transition-all w-full shadow-md active:scale-[0.98]">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    const payload = verifyToken(token) as any;
    if (!payload?.UserID) {
        return <div className="min-h-screen flex items-center justify-center p-8 text-center text-rose-500 font-extrabold text-xl">Invalid session.</div>;
    }

    const user = await prisma.sec_user.findUnique({
        where: { UserID: payload.UserID },
        include: {
            sec_role_sec_user_RoleIDTosec_role: true,
        }
    });

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center p-8 text-center text-rose-500 font-extrabold text-xl">User account not found.</div>;
    }

    // Prepare display variables
    const profileImageSrc = user.ProfileURL || "/profile.svg";
    const userRole = user.sec_role_sec_user_RoleIDTosec_role?.RoleName || "Patient";
    const joinDate = user.Created ? new Date(user.Created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently";

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 pt-24 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl -translate-y-1/2"></div>
                
                <div className="container max-w-5xl mx-auto px-6 relative z-10 animate-slideUpFade">
                    <div className="flex items-center gap-2 text-primary-600 mb-5 text-[12px] font-extrabold tracking-widest uppercase bg-primary-50 w-fit px-3 py-1.5 rounded-lg border border-primary-100 shadow-sm">
                        <User className="w-3.5 h-3.5" />
                        <span>Account Overview</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        My Profile
                    </h1>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container max-w-5xl mx-auto px-6 -mt-10 relative z-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Avatar & Quick Actions */}
                    <div className="md:col-span-1 space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white rounded-[1.25rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary-50 to-transparent"></div>
                            
                            <div className="relative mb-6 z-10 mt-4">
                                <div className="w-36 h-36 rounded-full border-[6px] border-white shadow-xl shadow-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={profileImageSrc}
                                        alt={user.FullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full border border-slate-200 shadow-lg text-slate-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all z-20 hover:scale-110 active:scale-95">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900 mb-2 relative z-10">{user.FullName}</h2>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white text-[12px] font-bold tracking-widest uppercase rounded-lg shadow-sm relative z-10 shadow-slate-300">
                                <Shield className="w-3.5 h-3.5 text-primary-400" />
                                {userRole}
                            </span>
                        </div>

                        {/* Settings Nav Area */}
                        <div className="bg-white rounded-[1.25rem] p-3 shadow-sm border border-slate-200 flex flex-col gap-1">
                            <Link href="/user/modules/sec/userProfile/myProfile" className="flex items-center gap-3 px-5 py-4 rounded-xl bg-primary-50 border border-primary-100 text-primary-700 font-bold text-[14px] transition-all shadow-sm">
                                <User className="w-4 h-4" />
                                Personal Information
                            </Link>
                            {/* Decorative placeholders */}
                            <button className="flex items-center gap-3 px-5 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold text-[14px] transition-all text-left w-full cursor-not-allowed opacity-60">
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </button>
                            <button className="flex items-center gap-3 px-5 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold text-[14px] transition-all text-left w-full cursor-not-allowed opacity-60">
                                <Activity className="w-4 h-4" />
                                Activity Log
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-200">
                            <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-5">
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Personal Details</h3>
                                <button className="flex items-center gap-2 text-[13px] font-extrabold text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-primary-100 uppercase tracking-widest">
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
                                {/* Field: Full Name */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Full Name
                                    </label>
                                    <div className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                                        {user.FullName}
                                    </div>
                                </div>

                                {/* Field: User Name (System ID) */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5" /> Username
                                    </label>
                                    <div className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                                        {user.UserName}
                                    </div>
                                </div>

                                {/* Field: Email */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" /> Email Address
                                    </label>
                                    <div className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                                        {user.Email || <span className="text-slate-400 italic font-medium">Not provided</span>}
                                    </div>
                                </div>

                                {/* Field: Mobile Number */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" /> Phone Number
                                    </label>
                                    <div className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                                        {user.MobileNo || <span className="text-slate-400 italic font-medium">Not provided</span>}
                                    </div>
                                </div>

                                {/* Field: Member Since */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" /> Member Since
                                    </label>
                                    <div className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                                        {joinDate}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white rounded-[1.25rem] p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                                <h4 className="text-[16px] font-extrabold text-slate-900 mb-2">Password & Security</h4>
                                <p className="text-[14px] text-slate-500 font-medium mb-6 leading-relaxed">Manage your password and security preferences safely.</p>
                                <button className="w-full text-center py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-[14px] font-bold transition-colors border border-slate-200 shadow-sm">
                                    Change Password
                                </button>
                            </div>
                            <div className="bg-slate-900 rounded-[1.25rem] p-8 shadow-xl shadow-slate-900/10 border border-slate-800 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-transparent opacity-50 z-0"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary-500/30 transition-colors"></div>
                                
                                <h4 className="text-[16px] font-extrabold text-white mb-2 relative z-10 flex items-center gap-2">
                                    Medical Records
                                </h4>
                                <p className="text-[14px] text-slate-300 font-medium mb-6 relative z-10 leading-relaxed">Access your historical appointment and lab testing data.</p>
                                <button className="w-full text-center py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[14px] font-bold transition-colors border border-white/20 relative z-10 shadow-sm backdrop-blur-sm">
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