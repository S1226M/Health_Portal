import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Package, Clock, CheckCircle, CreditCard, ShoppingBag, ArrowLeft, MapPin, Phone, Building } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
    const resolvedParams = await params;
    const orderId = Number(resolvedParams.orderId);
    
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        redirect("/auth/login");
    }

    const payload = verifyToken(token) as any;
    if (!payload?.UserID) {
        return <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold">Invalid session.</div>;
    }

    const order = await prisma.phm_orderofmedicine.findUnique({
        where: { 
            OrderOfMedicineID: orderId
        },
        include: {
            phm_medicine: {
                include: {
                    phm_medicinecategory: true,
                }
            },
            phm_medicineorderpaymenttype: true,
        }
    });

    if (!order || order.CreatedByUserID !== payload.UserID) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Order Not Found</h2>
                <p className="text-slate-500 mb-6">This order does not exist or you don't have permission to view it.</p>
                <Link href="/user/modules/phm/medicines/orders" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:bg-emerald-700 transition">
                    Back to Orders
                </Link>
            </div>
        );
    }

    const orderTotal = Number(order.TotalAmount) || (Number(order.phm_medicine.Price) * order.Quantity);

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                <div className="container max-w-4xl mx-auto px-6 relative z-10 animate-slideUpFade">
                    <Link href="/user/modules/phm/medicines/orders" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Orders
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 mb-3 text-[12px] font-extrabold tracking-widest uppercase bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                                <Package className="w-3.5 h-3.5" />
                                <span>Order Details</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Order #{order.OrderOfMedicineID}
                            </h1>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 border border-emerald-200 shadow-sm w-fit">
                            <CheckCircle className="w-5 h-5 emerald-500" /> Processed
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container max-w-4xl mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column - Medicine Details */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-200 animate-slideUpFade">
                            <h2 className="text-[14px] font-extrabold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" /> Item Summary
                            </h2>
                            
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden relative">
                                    <Package className="w-12 h-12 text-slate-300" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{order.phm_medicine.MedicineName}</h3>
                                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[12px] font-bold rounded-lg mb-4 uppercase tracking-wider">
                                        {order.phm_medicine.phm_medicinecategory?.CategoryName || "General"}
                                    </span>
                                    {order.phm_medicine.Manufacturer && (
                                        <p className="text-slate-500 font-bold mb-4 flex items-center gap-2 text-[14px]">
                                            <Building className="w-4 h-4 text-slate-400" />
                                            {order.phm_medicine.Manufacturer}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Qty</p>
                                            <p className="text-[16px] font-bold text-slate-800">{order.Quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Unit Price</p>
                                            <p className="text-[16px] font-bold text-slate-800">₹{Number(order.phm_medicine.Price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-200 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                            <h2 className="text-[14px] font-extrabold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Delivery Information
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-1">
                                        <MapPin className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                                        <p className="text-[15px] font-bold text-slate-800">{order.Address || "No Address Provided"}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <Building className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">City</p>
                                        <p className="text-[15px] font-bold text-slate-800">{order.City || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                                        <p className="text-[15px] font-bold text-slate-800">{order.PhoneNumber || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Order Summary & Payment */}
                    <div className="md:col-span-1 space-y-8">
                        
                        <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-200 sticky top-6 animate-slideUpFade" style={{ animationDelay: "0.2s" }}>
                            <h2 className="text-[14px] font-extrabold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Payment Details
                            </h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-slate-500 font-bold">Subtotal</span>
                                    <span className="text-slate-900 font-extrabold">₹{(Number(order.phm_medicine.Price) * order.Quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-slate-500 font-bold">Delivery</span>
                                    <span className="text-emerald-600 font-extrabold">FREE</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-slate-800 font-extrabold text-[16px]">Total Paid</span>
                                <span className="text-2xl font-extrabold text-emerald-600">₹{orderTotal.toFixed(2)}</span>
                            </div>

                            <div>
                                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Payment Method</p>
                                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                                    <CreditCard className="w-5 h-5 text-slate-500" />
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-slate-800 text-[14px] leading-none">
                                            {order.PaymentMethod || order.phm_medicineorderpaymenttype.MedicineOrderPaymentTypeName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Order Timeline</p>
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1"></div>
                                        <div className="absolute top-4 bottom-[-16px] left-[5px] w-0.5 bg-emerald-100"></div>
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-slate-800">Order Placed</p>
                                        <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                                            {new Date(order.OrderDateTime).toLocaleString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 mt-6">
                                    <div className="relative z-10">
                                        <div className="w-3 h-3 rounded-full border-2 border-slate-300 bg-white mt-1"></div>
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-slate-400">Out for Delivery</p>
                                        <p className="text-[13px] text-slate-400 font-medium mt-0.5">Estimated soon</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
