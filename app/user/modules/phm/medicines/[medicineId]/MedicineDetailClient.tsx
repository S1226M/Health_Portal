"use client";

import React, { useState } from "react";
import {
    Pill, ShoppingCart, ChevronRight, ChevronLeft, Package, Shield, Truck,
    Star, IndianRupee, Minus, Plus, Heart, Share2, CheckCircle2, Clock,
    CreditCard, RotateCcw, Award, AlertCircle, ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { orderMedicine } from "@/app/user/modules/phm/medicines/action/orderMedicine";

interface Medicine {
    MedicineID: number;
    MedicineName: string;
    MedicineCategoryID: number;
    Price: string | number;
    Manufacturer: string | null;
    phm_medicinecategory: {
        MedicineCategoryID: number;
        CategoryName: string;
    } | null;
}

interface PaymentType {
    MedicineOrderPaymentTypeID: number;
    MedicineOrderPaymentTypeName: string;
}

export default function MedicineDetailClient({
    medicine,
    paymentTypes,
}: {
    medicine: Medicine;
    paymentTypes: PaymentType[];
}) {
    const [quantity, setQuantity] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<number>(paymentTypes[0]?.MedicineOrderPaymentTypeID || 0);
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);

    const price = Number(medicine.Price);
    const totalPrice = price * quantity;

    const handleOrder = async () => {
        if (!selectedPayment) {
            setOrderError("Please select a payment method.");
            return;
        }

        setIsOrdering(true);
        setOrderError("");

        try {
            const result = await orderMedicine({
                medicineId: medicine.MedicineID,
                quantity,
                paymentTypeId: selectedPayment,
            });

            if (result.success) {
                setOrderSuccess(true);
            } else {
                setOrderError(result.message);
            }
        } catch (err) {
            setOrderError("Failed to place order. Please try again.");
        } finally {
            setIsOrdering(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulseGlow" />

                <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-10 text-center max-w-md w-full animate-scaleIn relative z-10 glass">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200/50 border border-emerald-100">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Order Placed!</h2>
                    <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                        Your order for <span className="font-extrabold text-slate-900">{medicine.MedicineName}</span> (Qty: <span className="font-bold">{quantity}</span>) has been placed successfully.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
                        <div className="flex justify-between items-center text-[15px]">
                            <span className="text-slate-500 font-bold uppercase tracking-wider text-[12px]">Total Paid</span>
                            <span className="text-slate-900 font-extrabold text-2xl flex items-center gap-0.5">
                                <IndianRupee className="w-5 h-5" />{totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/user/modules/phm/medicines"
                            className="flex items-center justify-center gap-2 px-6 py-4 gradient-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all no-underline"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Continue Shopping
                        </Link>
                        <Link
                            href="/user"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors no-underline shadow-sm"
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm glass">
                <div className="container mx-auto px-6 max-w-7xl pt-8 pb-4">
                    <div className="flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-slate-400">
                        <Link href="/user/modules/phm/medicines" className="hover:text-primary-600 transition-colors flex items-center gap-1.5 py-1">
                            <ChevronLeft className="w-4 h-4" /> Medicines
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-800 truncate px-2 py-1 bg-slate-100 rounded-md border border-slate-200 shadow-sm">{medicine.MedicineName}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-7xl mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Product Image */}
                    <div className="animate-slideUpFade">
                        <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden sticky top-32">
                            <div className="relative bg-gradient-to-br from-primary-50 via-slate-50 to-indigo-50/30 p-16 flex items-center justify-center aspect-square transition-all hover:bg-primary-50/50">
                                <div className="absolute top-6 left-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-extrabold bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm text-slate-700 uppercase tracking-widest">
                                        {/* <Tag className="w-3.5 h-3.5 text-primary-500" /> */}
                                        {medicine.phm_medicinecategory?.CategoryName || "General"}
                                    </span>
                                </div>
                                <div className="absolute top-6 right-6 flex flex-col gap-3">
                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-3.5 rounded-2xl shadow-md transition-all border ${isWishlisted ? 'bg-rose-50 border-rose-200 scale-110' : 'bg-white border-slate-200 hover:bg-rose-50 hover:border-rose-200'}`}
                                    >
                                        <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                                    </button>
                                    <button className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-md hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors group">
                                        <Share2 className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                                    </button>
                                </div>
                                <div className="w-56 h-56 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                                    <Pill className="w-28 h-28 text-primary-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="space-y-8 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                        {/* Title & Category */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-5 text-[12px] font-extrabold text-primary-700 bg-primary-100/50 rounded-lg border border-primary-200 uppercase tracking-widest shadow-sm">
                                <Pill className="w-3.5 h-3.5" />
                                <span>{medicine.phm_medicinecategory?.CategoryName || "Medicine"}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                                {medicine.MedicineName}
                            </h1>
                            {medicine.Manufacturer && (
                                <p className="text-slate-500 font-bold flex items-center gap-2 text-[16px]">
                                    <Package className="w-5 h-5 text-slate-400" />
                                    by <span className="text-slate-800 border-b border-slate-300 pb-0.5">{medicine.Manufacturer}</span>
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg font-extrabold text-[15px] shadow-sm">
                                4.2 <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            </div>
                            <span className="text-slate-400 font-bold text-[14px] hover:text-slate-600 transition-colors cursor-pointer decoration-slate-300 underline-offset-4 hover:underline">128 Verified Reviews</span>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-[1rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="text-emerald-700 font-extrabold text-[13px] bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-200 uppercase tracking-widest shadow-sm">
                                    20% OFF
                                </span>
                            </div>
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-slate-900 font-extrabold text-5xl flex items-center tracking-tight">
                                    <IndianRupee className="w-8 h-8 mb-1" />{price.toFixed(2)}
                                </span>
                                <span className="text-slate-400 line-through text-xl font-bold">
                                    ₹{(price * 1.2).toFixed(2)}
                                </span>
                            </div>
                            <p className="text-slate-500 text-[14px] font-bold">Inclusive of all taxes & fees</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="bg-white rounded-[1rem] border border-slate-200 p-8 shadow-sm">
                            <h3 className="text-[13px] font-bold text-slate-400 mb-5 uppercase tracking-widest">Select Quantity</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50 w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-5 py-4 hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-5 h-5 text-slate-700" />
                                    </button>
                                    <span className="px-6 py-4 font-extrabold text-xl border-x border-slate-200 min-w-[72px] text-center bg-white shadow-sm">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-5 py-4 hover:bg-white transition-colors"
                                    >
                                        <Plus className="w-5 h-5 text-slate-700" />
                                    </button>
                                </div>
                                <div className="text-slate-500 text-[14px] font-bold bg-slate-50 px-5 py-4 rounded-xl border border-slate-200 flex-1 sm:text-right">
                                    Total Amount: <span className="text-primary-700 font-extrabold text-2xl flex items-center gap-0.5 inline-flex ml-2">
                                        <IndianRupee className="w-5 h-5" />{totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        {paymentTypes.length > 0 && (
                            <div className="bg-white rounded-[1rem] border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-[13px] font-bold text-slate-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-slate-400" />
                                    Payment Method
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {paymentTypes.map((pt) => (
                                        <button
                                            key={pt.MedicineOrderPaymentTypeID}
                                            onClick={() => setSelectedPayment(pt.MedicineOrderPaymentTypeID)}
                                            className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${selectedPayment === pt.MedicineOrderPaymentTypeID
                                                ? 'border-primary-500 bg-primary-50 shadow-md transform -translate-y-0.5'
                                                : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50 bg-white'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPayment === pt.MedicineOrderPaymentTypeID
                                                ? 'border-primary-500 bg-white'
                                                : 'border-slate-300 bg-slate-50'
                                                }`}>
                                                {selectedPayment === pt.MedicineOrderPaymentTypeID && (
                                                    <div className="w-3 h-3 rounded-full bg-primary-600 animate-scaleIn"></div>
                                                )}
                                            </div>
                                            <span className="font-extrabold text-[15px] text-slate-800">{pt.MedicineOrderPaymentTypeName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {orderError && (
                            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-bold text-[14px] shadow-sm animate-shake">
                                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                                {orderError}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
                            <button
                                onClick={handleOrder}
                                disabled={isOrdering}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-5 gradient-primary text-white rounded-[1rem] font-extrabold text-[16px] transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isOrdering ? (
                                    <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                )}
                                <span className="relative">
                                    {isOrdering ? "Placing Order..." : "Buy Now"}
                                </span>
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-slate-900 text-white rounded-[1rem] font-extrabold text-[16px] hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 group"
                                onClick={handleOrder}
                                disabled={isOrdering}
                            >
                                <ShoppingCart className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                { icon: Shield, label: "100% Genuine", color: "text-emerald-500", bg: "bg-emerald-50" },
                                { icon: Truck, label: "Fast Delivery", color: "text-blue-500", bg: "bg-blue-50" },
                                { icon: RotateCcw, label: "Easy Returns", color: "text-purple-500", bg: "bg-purple-50" },
                                { icon: Award, label: "Best Price", color: "text-amber-500", bg: "bg-amber-50" },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`p-2.5 rounded-lg ${badge.bg}`}>
                                        <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                    </div>
                                    <span className="text-[13px] font-extrabold text-slate-700 tracking-wide">{badge.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Product Details Table */}
                        <div className="bg-white rounded-[1rem] border border-slate-200 overflow-hidden shadow-sm mt-8">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                                <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Pill className="w-4 h-4 text-slate-400" /> Specifications
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-slate-500 font-bold text-[14px]">Medicine Name</span>
                                    <span className="text-slate-900 font-extrabold text-[14px] text-right">{medicine.MedicineName}</span>
                                </div>
                                <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-slate-500 font-bold text-[14px]">Category</span>
                                    <span className="text-slate-900 font-extrabold text-[14px] text-right">{medicine.phm_medicinecategory?.CategoryName || "General"}</span>
                                </div>
                                {medicine.Manufacturer && (
                                    <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                        <span className="text-slate-500 font-bold text-[14px]">Manufacturer</span>
                                        <span className="text-slate-900 font-extrabold text-[14px] text-right">{medicine.Manufacturer}</span>
                                    </div>
                                )}
                                <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-slate-500 font-bold text-[14px]">List Price</span>
                                    <span className="text-slate-900 font-extrabold text-[14px] flex items-center gap-0.5 text-right">
                                        <IndianRupee className="w-4 h-4" />{price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-slate-500 font-bold text-[14px]">Availability</span>
                                    <span className="text-emerald-700 font-extrabold text-[14px] flex items-center gap-1.5 justify-end">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        In Stock
                                    </span>
                                </div>
                                <div className="flex justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-slate-500 font-bold text-[14px]">Delivery Estimate</span>
                                    <span className="text-slate-900 font-extrabold text-[14px] flex items-center gap-1.5 justify-end">
                                        <Clock className="w-4 h-4 text-blue-500" /> 2-3 Business Days
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
