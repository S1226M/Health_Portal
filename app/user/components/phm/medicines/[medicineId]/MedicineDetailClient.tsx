"use client";

import React, { useState } from "react";
import {
    Pill, ShoppingCart, ChevronRight, ChevronLeft, Package, Shield, Truck,
    Star, IndianRupee, Minus, Plus, Heart, Share2, CheckCircle2, Clock,
    CreditCard, RotateCcw, Award, AlertCircle, ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { orderMedicine } from "@/app/user/modules/pharmacy/action/orderMedicine";

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
            <div className="min-h-screen bg-industrial-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl border border-industrial-200 shadow-lg p-10 text-center max-w-md w-full animate-slideUpFade">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-industrial-900 mb-3">Order Placed!</h2>
                    <p className="text-industrial-600 font-medium mb-6">
                        Your order for <span className="font-bold text-industrial-900">{medicine.MedicineName}</span> (Qty: {quantity}) has been placed successfully.
                    </p>
                    <div className="bg-industrial-50 border border-industrial-200 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-industrial-500 font-medium">Total Paid</span>
                            <span className="text-industrial-900 font-extrabold text-lg flex items-center gap-0.5">
                                <IndianRupee className="w-4 h-4" />{totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/user/components/phm/medicines"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors no-underline"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Continue Shopping
                        </Link>
                        <Link
                            href="/user"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-industrial-100 text-industrial-700 rounded-lg font-bold hover:bg-industrial-200 transition-colors no-underline"
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-industrial-50 font-sans text-industrial-900 pb-24">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-industrial-200">
                <div className="container mx-auto px-6 max-w-7xl py-4">
                    <div className="flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase text-industrial-500">
                        <Link href="/user/components/phm/medicines" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                            <ChevronLeft className="w-4 h-4" /> Medicines
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-industrial-900 truncate">{medicine.MedicineName}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-7xl mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left - Product Image */}
                    <div className="animate-slideUpFade">
                        <div className="bg-white rounded-2xl border border-industrial-200 shadow-sm overflow-hidden sticky top-24">
                            <div className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 p-16 flex items-center justify-center aspect-square">
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold bg-white rounded-full border border-industrial-200 shadow-sm text-industrial-700">
                                        {medicine.phm_medicinecategory?.CategoryName || "General"}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-2.5 rounded-full shadow-md transition-all ${isWishlisted ? 'bg-red-50 border border-red-200' : 'bg-white border border-industrial-200 hover:bg-red-50'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-industrial-400'}`} />
                                    </button>
                                    <button className="p-2.5 bg-white rounded-full border border-industrial-200 shadow-md hover:bg-industrial-50 transition-colors">
                                        <Share2 className="w-5 h-5 text-industrial-400" />
                                    </button>
                                </div>
                                <Pill className="w-32 h-32 text-primary-300/60" />
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="space-y-6 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                        {/* Title & Category */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 text-[11px] font-bold text-primary-700 bg-primary-50 rounded-full border border-primary-200 uppercase tracking-widest">
                                <Pill className="w-3.5 h-3.5" />
                                <span>{medicine.phm_medicinecategory?.CategoryName || "Medicine"}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-industrial-900 tracking-tight mb-3">
                                {medicine.MedicineName}
                            </h1>
                            {medicine.Manufacturer && (
                                <p className="text-industrial-500 font-medium flex items-center gap-2 text-[15px]">
                                    <Package className="w-4 h-4 text-industrial-400" />
                                    by <span className="text-industrial-700 font-bold">{medicine.Manufacturer}</span>
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 pb-5 border-b border-industrial-200">
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-sm">
                                4.0 <Star className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <span className="text-industrial-500 font-medium text-sm">Based on customer reviews</span>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-xl border border-industrial-200 p-6 shadow-sm">
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-industrial-900 font-extrabold text-4xl flex items-center">
                                    <IndianRupee className="w-7 h-7" />{price.toFixed(2)}
                                </span>
                                <span className="text-industrial-400 line-through text-lg font-medium">
                                    ₹{(price * 1.2).toFixed(2)}
                                </span>
                                <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                                    20% OFF
                                </span>
                            </div>
                            <p className="text-industrial-500 text-sm font-medium">Inclusive of all taxes</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="bg-white rounded-xl border border-industrial-200 p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-industrial-900 mb-4 uppercase tracking-wide">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-industrial-200 rounded-xl overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:bg-industrial-50 transition-colors disabled:opacity-40"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 py-3 font-extrabold text-lg border-x border-industrial-200 min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:bg-industrial-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-industrial-500 text-sm font-medium">
                                    Total: <span className="text-industrial-900 font-extrabold text-xl flex items-center gap-0.5 inline-flex">
                                        <IndianRupee className="w-4 h-4" />{totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        {paymentTypes.length > 0 && (
                            <div className="bg-white rounded-xl border border-industrial-200 p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-industrial-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-primary-500" />
                                    Payment Method
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {paymentTypes.map((pt) => (
                                        <button
                                            key={pt.MedicineOrderPaymentTypeID}
                                            onClick={() => setSelectedPayment(pt.MedicineOrderPaymentTypeID)}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${selectedPayment === pt.MedicineOrderPaymentTypeID
                                                ? 'border-primary-500 bg-primary-50 shadow-sm'
                                                : 'border-industrial-200 hover:border-industrial-300 bg-white'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === pt.MedicineOrderPaymentTypeID
                                                ? 'border-primary-500'
                                                : 'border-industrial-300'
                                                }`}>
                                                {selectedPayment === pt.MedicineOrderPaymentTypeID && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                                                )}
                                            </div>
                                            <span className="font-bold text-sm text-industrial-700">{pt.MedicineOrderPaymentTypeName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {orderError && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {orderError}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleOrder}
                                disabled={isOrdering}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-[16px] hover:bg-primary-700 transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isOrdering ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <ShoppingBag className="w-5 h-5" />
                                )}
                                {isOrdering ? "Placing Order..." : "Buy Now"}
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-bold text-[16px] hover:bg-amber-600 transition-all shadow-sm active:scale-[0.98]"
                                onClick={handleOrder}
                                disabled={isOrdering}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { icon: Shield, label: "100% Genuine", color: "text-emerald-500" },
                                { icon: Truck, label: "Fast Delivery", color: "text-blue-500" },
                                { icon: RotateCcw, label: "Easy Returns", color: "text-purple-500" },
                                { icon: Award, label: "Best Price", color: "text-amber-500" },
                            ].map((badge) => (
                                <div key={badge.label} className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-industrial-200 shadow-sm">
                                    <badge.icon className={`w-6 h-6 ${badge.color}`} />
                                    <span className="text-[11px] font-bold text-industrial-600 uppercase tracking-wide text-center">{badge.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-xl border border-industrial-200 p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-industrial-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                <Pill className="w-4 h-4 text-primary-500" /> Product Details
                            </h3>
                            <div className="divide-y divide-industrial-100">
                                <div className="flex justify-between py-3">
                                    <span className="text-industrial-500 font-medium text-sm">Medicine Name</span>
                                    <span className="text-industrial-900 font-bold text-sm">{medicine.MedicineName}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-industrial-500 font-medium text-sm">Category</span>
                                    <span className="text-industrial-900 font-bold text-sm">{medicine.phm_medicinecategory?.CategoryName || "General"}</span>
                                </div>
                                {medicine.Manufacturer && (
                                    <div className="flex justify-between py-3">
                                        <span className="text-industrial-500 font-medium text-sm">Manufacturer</span>
                                        <span className="text-industrial-900 font-bold text-sm">{medicine.Manufacturer}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-3">
                                    <span className="text-industrial-500 font-medium text-sm">Price</span>
                                    <span className="text-industrial-900 font-bold text-sm flex items-center gap-0.5">
                                        <IndianRupee className="w-3.5 h-3.5" />{price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-industrial-500 font-medium text-sm">Availability</span>
                                    <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" /> In Stock
                                    </span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-industrial-500 font-medium text-sm">Delivery</span>
                                    <span className="text-industrial-900 font-bold text-sm flex items-center gap-1">
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
