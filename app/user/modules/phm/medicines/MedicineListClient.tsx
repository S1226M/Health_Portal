"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Pill, ShoppingCart, Tag, Package, ChevronRight, X, SlidersHorizontal, IndianRupee, Star, Heart, Eye } from "lucide-react";
import Link from "next/link";

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

interface Category {
    MedicineCategoryID: number;
    CategoryName: string;
}

export default function MedicineListClient({
    initialMedicines,
    categories,
}: {
    initialMedicines: Medicine[];
    categories: Category[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>("name");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [showFilters, setShowFilters] = useState(false);

    const maxPrice = useMemo(() => {
        return Math.max(...initialMedicines.map(m => Number(m.Price)), 100);
    }, [initialMedicines]);

    const filteredMedicines = useMemo(() => {
        let meds = [...initialMedicines];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            meds = meds.filter((med) => {
                const nameMatch = med.MedicineName?.toLowerCase().includes(query);
                const mfgMatch = med.Manufacturer?.toLowerCase().includes(query);
                const catMatch = med.phm_medicinecategory?.CategoryName?.toLowerCase().includes(query);
                return nameMatch || mfgMatch || catMatch;
            });
        }

        // Category filter
        if (selectedCategory) {
            meds = meds.filter(med => med.MedicineCategoryID === selectedCategory);
        }

        // Price range filter
        meds = meds.filter(med => {
            const price = Number(med.Price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case "price-low":
                meds.sort((a, b) => Number(a.Price) - Number(b.Price));
                break;
            case "price-high":
                meds.sort((a, b) => Number(b.Price) - Number(a.Price));
                break;
            case "name":
            default:
                meds.sort((a, b) => a.MedicineName.localeCompare(b.MedicineName));
                break;
        }

        return meds;
    }, [initialMedicines, searchQuery, selectedCategory, sortBy, priceRange]);

    const getCategoryColor = (categoryName: string) => {
        const colors: Record<string, string> = {
            'Tablet': 'bg-blue-50 text-blue-700 border-blue-200',
            'Syrup': 'bg-amber-50 text-amber-700 border-amber-200',
            'Capsule': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'Injection': 'bg-rose-50 text-rose-700 border-rose-200',
            'Cream': 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
            'Drops': 'bg-cyan-50 text-cyan-700 border-cyan-200',
            'Inhaler': 'bg-purple-50 text-purple-700 border-purple-200',
        };
        return colors[categoryName] || 'bg-slate-100 text-slate-700 border-slate-200';
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
            {/* Hero Banner */}
            <div className="relative overflow-hidden mb-10">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulseGlow" />

                <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-16 pb-24 text-center animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[13px] font-bold text-primary-200 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-sm shadow-sm opacity-90">
                        <Pill className="w-4 h-4" />
                        <span>Online Pharmacy</span>
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-5">
                        Order Medicines <span className="text-primary-400">Online</span>
                    </h1>
                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
                        Browse our wide selection of medicines. Get genuine products delivered to your doorstep with trusted quality and convenience.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-[1rem] shadow-xl border border-white/20 flex flex-col md:flex-row gap-2 relative z-20 transition-all hover:bg-white/15">
                        <div className="flex-1 flex items-center px-4 bg-white rounded-xl border border-transparent focus-within:ring-4 focus-within:ring-primary-500/20 transition-all">
                            <Search className="w-5 h-5 text-slate-400 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search medicines, categories, manufacturers..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3.5 text-slate-900 placeholder:text-slate-400 text-[15px] font-bold"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-4 h-4 text-slate-500" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className={`${showFilters ? 'block fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 p-4 md:static md:bg-transparent md:backdrop-blur-none md:p-0' : 'hidden'} md:block w-full md:w-72 shrink-0 animate-fadeIn`}>
                        <div className={`bg-white rounded-[1rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sticky top-24 space-y-8 h-full md:h-auto overflow-y-auto ${showFilters ? 'animate-slideInRight' : ''}`}>
                            {/* Mobile header */}
                            <div className="flex items-center justify-between mb-2 md:hidden">
                                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><Filter className="w-5 h-5 text-primary-500"/> Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="hidden md:flex items-center gap-2 text-[13px] font-bold text-primary-600 uppercase tracking-widest border-b border-slate-100 pb-3">
                                <Filter className="w-4 h-4" />
                                <span>Refine Search</span>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-primary-500" />
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => { setSelectedCategory(null); setShowFilters(false); }}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-bold transition-all border ${!selectedCategory
                                            ? 'bg-primary-50 text-primary-700 border-primary-200 shadow-sm shadow-primary-500/10'
                                            : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'
                                            }`}
                                    >
                                        All Categories <span className="float-right text-[12px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 shadow-sm">{initialMedicines.length}</span>
                                    </button>
                                    {categories.map((cat) => {
                                        const count = initialMedicines.filter(m => m.MedicineCategoryID === cat.MedicineCategoryID).length;
                                        return (
                                            <button
                                                key={cat.MedicineCategoryID}
                                                onClick={() => { setSelectedCategory(cat.MedicineCategoryID); setShowFilters(false); }}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-bold transition-all border ${selectedCategory === cat.MedicineCategoryID
                                                    ? 'bg-primary-50 text-primary-700 border-primary-200 shadow-sm shadow-primary-500/10'
                                                    : 'text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200'
                                                    }`}
                                            >
                                                <span className="truncate pr-8 block relative">
                                                    {cat.CategoryName}
                                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[12px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 shadow-sm">{count}</span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                                    Price Range
                                </h3>
                                <div className="space-y-4 px-1">
                                    <input
                                        type="range"
                                        min={0}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full accent-primary-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex items-center justify-between text-[14px] font-bold">
                                        <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 shadow-sm">₹{priceRange[0]}</div>
                                        <div className="h-px w-4 bg-slate-300"></div>
                                        <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-primary-700 shadow-sm">₹{priceRange[1]}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4 text-primary-500" />
                                    Sort By
                                </h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-[14px] text-slate-700 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all shadow-sm hover:border-slate-300 appearance-none"
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            {(selectedCategory || searchQuery || priceRange[1] < maxPrice) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSearchQuery("");
                                        setPriceRange([0, maxPrice]);
                                        setSortBy("name");
                                    }}
                                    className="w-full px-4 py-3 border border-rose-200 bg-rose-50 text-rose-600 rounded-xl font-bold text-[14px] hover:bg-rose-100 transition-colors shadow-sm"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 animate-slideUpFade" style={{ animationDelay: '0.1s' }}>
                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 bg-white/80 glass p-5 rounded-[1rem] shadow-sm">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    {selectedCategory
                                        ? categories.find(c => c.MedicineCategoryID === selectedCategory)?.CategoryName
                                        : "All Medicines"
                                    }
                                </h2>
                                <p className="text-[14px] text-slate-500 font-medium mt-1">
                                    Showing <span className="text-slate-900 font-bold">{filteredMedicines.length}</span> of {initialMedicines.length} products
                                </p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="md:hidden flex-1 sm:flex-none justify-center px-4 py-2.5 bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-colors"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>
                                <div className="hidden sm:flex px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-[13px] font-bold tracking-wide items-center gap-2 shadow-sm">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    {filteredMedicines.length} Live Items
                                </div>
                            </div>
                        </div>

                        {/* Active Filter Tags */}
                        {(selectedCategory || searchQuery) && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg text-[13px] font-bold shadow-sm">
                                        {categories.find(c => c.MedicineCategoryID === selectedCategory)?.CategoryName}
                                        <button onClick={() => setSelectedCategory(null)} className="hover:bg-primary-200 text-primary-500 p-0.5 rounded-md transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[13px] font-bold shadow-sm">
                                        &quot;{searchQuery}&quot;
                                        <button onClick={() => setSearchQuery("")} className="hover:bg-slate-200 text-slate-500 p-0.5 rounded-md transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMedicines.map((med) => (
                                <Link
                                    key={med.MedicineID}
                                    href={`/user/modules/phm/medicines/${med.MedicineID}`}
                                    className="card-premium gradient-card-hover group flex flex-col relative no-underline overflow-hidden bg-white"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="relative bg-slate-50 p-8 flex items-center justify-center h-52 overflow-hidden border-b border-slate-100 group-hover:bg-primary-50/50 transition-colors">
                                        <div className="absolute top-4 left-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-extrabold rounded-lg border shadow-sm ${getCategoryColor(med.phm_medicinecategory?.CategoryName || '')}`}>
                                                {med.phm_medicinecategory?.CategoryName || "General"}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                            <div className="flex flex-col gap-2">
                                                <div className="p-2.5 bg-white rounded-xl shadow-md border border-slate-100 hover:border-rose-200 hover:bg-rose-50 transition-all cursor-pointer group/btn" onClick={(e) => e.preventDefault()}>
                                                    <Heart className="w-4 h-4 text-slate-400 group-hover/btn:text-rose-500 group-hover/btn:fill-rose-500 transition-all" />
                                                </div>
                                                <div className="p-2.5 bg-white rounded-xl shadow-md border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all cursor-pointer group/btn">
                                                    <Eye className="w-4 h-4 text-slate-400 group-hover/btn:text-primary-500 transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-500 ease-out z-0">
                                            <Pill className="w-12 h-12 text-primary-400 group-hover:text-primary-500 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1 mb-4">
                                            <h3 className="text-[16px] font-extrabold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight decoration-transparent underline-offset-4 group-hover:decoration-primary-600" title={med.MedicineName}>
                                                {med.MedicineName}
                                            </h3>
                                            {med.Manufacturer && (
                                                <p className="text-[13px] text-slate-500 font-bold flex items-center gap-1.5">
                                                    <Package className="w-4 h-4 text-slate-400" />
                                                    <span className="truncate">{med.Manufacturer}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Rating placeholder */}
                                        <div className="flex items-center gap-1 font-bold">
                                            <div className="flex items-center gap-0.5 px-2 py-1 bg-amber-50 rounded-md border border-amber-100">
                                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                              <span className="text-[12px] text-amber-700 ml-0.5">4.2</span>
                                            </div>
                                            <span className="text-[12px] text-slate-400 ml-1 font-medium">(128 reviews)</span>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-end justify-between pt-5 mt-auto border-t border-slate-100">
                                            <div>
                                                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</span>
                                                <div className="flex items-center gap-0.5 text-slate-900 font-extrabold text-xl">
                                                    <IndianRupee className="w-4 h-4" />
                                                    {Number(med.Price).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[13px] font-bold group-hover:bg-primary-600 transition-colors shadow-md">
                                                <ShoppingCart className="w-4 h-4" />
                                                View
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredMedicines.length === 0 && (
                            <div className="col-span-full py-24 bg-white rounded-[1rem] border border-slate-200 text-center shadow-sm flex flex-col items-center justify-center">
                                <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inset">
                                    <Package className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No Medicines Found</h3>
                                <p className="text-slate-500 max-w-md mx-auto font-medium text-[15px] leading-relaxed">
                                    {searchQuery
                                        ? `We couldn't find any medicine matching "${searchQuery}". Try adjusting your search or filters.`
                                        : "No medicines match the selected filters. Try adjusting your criteria."}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSearchQuery("");
                                        setPriceRange([0, maxPrice]);
                                    }}
                                    className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
