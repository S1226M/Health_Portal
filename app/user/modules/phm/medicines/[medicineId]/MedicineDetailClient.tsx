"use client";

import React, { useState } from "react";
import {
    Pill, ShoppingCart, ChevronRight, ChevronLeft, Package, Shield, Truck,
    Star, IndianRupee, Minus, Plus, Heart, Share2, CheckCircle2, Clock,
    CreditCard, RotateCcw, Award, AlertCircle, ShoppingBag, MapPin, ArrowLeft
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

type Step = 'detail' | 'confirm' | 'success';

export default function MedicineDetailClient({
    medicine,
    paymentTypes,
}: {
    medicine: Medicine;
    paymentTypes: PaymentType[];
}) {
    const [quantity, setQuantity] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<number>(
        paymentTypes.find(pt => pt.MedicineOrderPaymentTypeName.toLowerCase().includes('cash'))?.MedicineOrderPaymentTypeID || paymentTypes[0]?.MedicineOrderPaymentTypeID || 0
    );
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [step, setStep] = useState<Step>('detail');
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliveryPhone, setDeliveryPhone] = useState("");

    const price = Number(medicine.Price);
    const totalPrice = price * quantity;

    const selectedPaymentName = paymentTypes.find(pt => pt.MedicineOrderPaymentTypeID === selectedPayment)?.MedicineOrderPaymentTypeName || "N/A";

    const handleProceedToCheckout = () => {
        if (!selectedPayment) {
            setOrderError("Please select a payment method.");
            return;
        }
        setOrderError("");
        setStep('confirm');
    };

    const handlePlaceOrder = async () => {
        if (!deliveryAddress.trim()) {
            setOrderError("Please enter a delivery address.");
            return;
        }

        setIsOrdering(true);
        setOrderError("");

        try {
            const result = await orderMedicine({
                medicineId: medicine.MedicineID,
                quantity,
                paymentTypeId: selectedPayment,
                address: deliveryAddress,
                city: deliveryCity,
                phoneNumber: deliveryPhone,
                totalAmount: totalPrice,
                paymentMethod: selectedPaymentName,
            });

            if (result.success) {
                setStep('success');
            } else {
                setOrderError(result.message);
            }
        } catch (err) {
            setOrderError("Failed to place order. Please try again.");
        } finally {
            setIsOrdering(false);
        }
    };

    // ========= SUCCESS SCREEN =========
    if (step === 'success') {
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
                            className="flex items-center justify-center gap-2 px-6 py-4 gradient-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Continue Shopping
                        </Link>
                        <Link
                            href="/user/modules/phm/medicines/orders"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-sm"
                        >
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ========= CONFIRMATION SCREEN =========
    if (step === 'confirm') {
        return (
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
                <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm glass">
                    <div className="container mx-auto px-6 max-w-4xl pt-8 pb-4">
                        <button
                            onClick={() => { setStep('detail'); setOrderError(''); }}
                            className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-primary-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Product
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-4xl mt-10 animate-slideUpFade">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Confirm Your Order
                    </h1>
                    <p className="text-slate-500 font-medium text-[15px] mb-10">Review the details below before placing your order.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Delivery & Payment */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Delivery Address */}
                            <div className="bg-white rounded-[1.25rem] border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Delivery Address
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-700 mb-2">Full Address *</label>
                                        <textarea
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
                                            placeholder="House No, Street, Area, Landmark..."
                                            rows={3}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none hover:border-slate-300 resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[13px] font-bold text-slate-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                value={deliveryCity}
                                                onChange={(e) => setDeliveryCity(e.target.value)}
                                                placeholder="Your city"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none hover:border-slate-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-bold text-slate-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={deliveryPhone}
                                                onChange={(e) => setDeliveryPhone(e.target.value)}
                                                placeholder="+91 XXXXXXXXXX"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none hover:border-slate-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Summary */}
                            <div className="bg-white rounded-[1.25rem] border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" /> Payment Method
                                </h3>
                                <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-emerald-500 bg-emerald-50">
                                    <div className="w-6 h-6 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <div>
                                        <span className="font-extrabold text-[15px] text-slate-900">{selectedPaymentName}</span>
                                        <span className="block text-[11px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">Selected</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[1.25rem] border border-slate-200 p-8 shadow-sm sticky top-24">
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4" /> Order Summary
                                </h3>

                                <div className="flex items-start gap-4 pb-6 border-b border-slate-100 mb-6">
                                    <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 border border-primary-100">
                                        <Pill className="w-8 h-8 text-primary-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-[15px] text-slate-900 leading-snug">{medicine.MedicineName}</h4>
                                        <p className="text-[12px] font-bold text-slate-400 mt-1">{medicine.phm_medicinecategory?.CategoryName || "Medicine"}</p>
                                        {medicine.Manufacturer && (
                                            <p className="text-[12px] font-bold text-slate-400">by {medicine.Manufacturer}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 text-[14px] mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-bold">Unit Price</span>
                                        <span className="text-slate-900 font-extrabold flex items-center gap-0.5">
                                            <IndianRupee className="w-3.5 h-3.5" />{price.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-bold">Quantity</span>
                                        <span className="text-slate-900 font-extrabold">{quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-bold">Delivery</span>
                                        <span className="text-emerald-600 font-extrabold">FREE</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-800 font-extrabold text-[16px]">Total</span>
                                        <span className="text-primary-700 font-extrabold text-2xl flex items-center gap-0.5">
                                            <IndianRupee className="w-5 h-5" />{totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Error */}
                                {orderError && (
                                    <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-bold text-[13px] mb-4 shadow-sm">
                                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                                        {orderError}
                                    </div>
                                )}

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isOrdering}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 gradient-primary text-white rounded-xl font-extrabold text-[15px] transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isOrdering ? (
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <CheckCircle2 className="w-5 h-5" />
                                    )}
                                    {isOrdering ? "Placing Order..." : "Place Order"}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-slate-400 font-bold">
                                    <Shield className="w-3.5 h-3.5" />
                                    Secure & Encrypted Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ========= PRODUCT DETAIL SCREEN =========
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
                            <span className="text-slate-400 font-bold text-[14px] hover:text-slate-600 transition-colors cursor-pointer">128 Verified Reviews</span>
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
                                    {paymentTypes.map((pt) => {
                                        const isCOD = pt.MedicineOrderPaymentTypeName.toLowerCase().includes('cash') || pt.MedicineOrderPaymentTypeName.toLowerCase().includes('cod');
                                        return (
                                            <button
                                                key={pt.MedicineOrderPaymentTypeID}
                                                onClick={() => isCOD && setSelectedPayment(pt.MedicineOrderPaymentTypeID)}
                                                disabled={!isCOD}
                                                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                                                    !isCOD ? 'opacity-50 cursor-not-allowed border-slate-100 bg-slate-50 grayscale' :
                                                    selectedPayment === pt.MedicineOrderPaymentTypeID
                                                        ? 'border-emerald-500 bg-emerald-50 shadow-md transform -translate-y-0.5'
                                                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 bg-white'
                                                }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                                    !isCOD ? 'border-slate-200 bg-slate-100' :
                                                    selectedPayment === pt.MedicineOrderPaymentTypeID
                                                        ? 'border-emerald-500 bg-white'
                                                        : 'border-slate-300 bg-slate-50'
                                                }`}>
                                                    {isCOD && selectedPayment === pt.MedicineOrderPaymentTypeID && (
                                                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-scaleIn"></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-extrabold text-[15px] ${!isCOD ? 'text-slate-500' : 'text-slate-900'}`}>{pt.MedicineOrderPaymentTypeName}</span>
                                                    {!isCOD && <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mt-1">Currently Unavailable</span>}
                                                    {isCOD && <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Recommended</span>}
                                                </div>
                                            </button>
                                        );
                                    })}
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
                                onClick={handleProceedToCheckout}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-5 gradient-primary text-white rounded-[1rem] font-extrabold text-[16px] transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                <span>Buy Now</span>
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-slate-900 text-white rounded-[1rem] font-extrabold text-[16px] hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
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
