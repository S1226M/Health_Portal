import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Package, Clock, CheckCircle, CreditCard, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function MedicineOrdersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Authentication Required</h2>
                <p className="text-slate-500 mb-6">Please log in to view your medicine orders.</p>
                <Link href="/auth/login" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:bg-emerald-700 transition">
                    Sign In
                </Link>
            </div>
        );
    }

    const payload = verifyToken(token) as any;
    if (!payload?.UserID) {
        return <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold">Invalid session.</div>;
    }

    const orders = await prisma.phm_orderofmedicine.findMany({
        where: { CreatedByUserID: payload.UserID },
        include: {
            phm_medicine: {
                include: {
                    phm_medicinecategory: true,
                }
            },
            phm_medicineorderpaymenttype: true,
        },
        orderBy: {
            OrderDateTime: 'desc',
        }
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 pt-24 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2"></div>

                <div className="container max-w-5xl mx-auto px-6 relative z-10 animate-slideUpFade">
                    <Link href="/user/modules/sec/userProfile/myProfile" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Profile
                    </Link>
                    <div className="flex items-center gap-2 text-emerald-600 mb-5 text-[12px] font-extrabold tracking-widest uppercase bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order History</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        My Medicine Orders
                    </h1>
                </div>
            </div>

            {/* Orders List Content */}
            <div className="container max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-[1.5rem] p-12 text-center shadow-xl shadow-slate-200/50 border border-slate-200 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mb-2">No Orders Found</h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't placed any medicine orders yet. Browse our pharmacy to find what you need.</p>
                        <Link href="/user/modules/phm/medicines" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                            Browse Pharmacy
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {orders.map((order, idx) => {
                            const orderTotal = Number(order.phm_medicine.Price) * order.Quantity;
                            return (
                                <div key={order.OrderOfMedicineID} className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group animate-slideUpFade" style={{ animationDelay: `${0.1 + (idx > 5 ? 5 : idx) * 0.05}s` }}>
                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pb-6 border-b border-slate-100 mb-6">
                                        <div>
                                            <div className="text-[12px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                                                Order ID: #{order.OrderOfMedicineID}
                                            </div>
                                            <div className="text-[14px] font-bold text-slate-600 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                {new Date(order.OrderDateTime).toLocaleDateString('en-US', {
                                                    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        <div className="bg-sky-50 text-sky-700 px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 border border-sky-200">
                                            <CheckCircle className="w-4 h-4" /> Delivered / Processing
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden relative">
                                            <Package className="w-12 h-12 text-slate-300" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between items-start gap-4 mb-2">
                                                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                        {order.phm_medicine.MedicineName}
                                                    </h3>
                                                    <span className="text-xl font-extrabold text-emerald-600">
                                                        ₹{orderTotal.toFixed(2)}
                                                    </span>
                                                </div>
                                                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[12px] font-bold rounded-lg mb-4 uppercase tracking-wider">
                                                    {order.phm_medicine.phm_medicinecategory.CategoryName}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Quantity</div>
                                                    <div className="text-[14px] font-bold text-slate-800">{order.Quantity} Units</div>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Payment Method</div>
                                                    <div className="text-[14px] font-bold text-slate-800">{order.phm_medicineorderpaymenttype.MedicineOrderPaymentTypeName}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
