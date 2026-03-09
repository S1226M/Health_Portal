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
            'Injection': 'bg-red-50 text-red-700 border-red-200',
            'Cream': 'bg-pink-50 text-pink-700 border-pink-200',
            'Drops': 'bg-cyan-50 text-cyan-700 border-cyan-200',
            'Inhaler': 'bg-purple-50 text-purple-700 border-purple-200',
        };
        return colors[categoryName] || 'bg-industrial-50 text-industrial-700 border-industrial-200';
    };

    return (
        <div className="min-h-screen bg-industrial-50 font-sans text-industrial-900">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-16 pb-20 text-center animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[13px] font-bold text-white/90 bg-white/10 rounded-full border border-white/20 uppercase tracking-widest backdrop-blur-sm">
                        <Pill className="w-4 h-4" />
                        <span>Online Pharmacy</span>
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-5">
                        Order Medicines <span className="text-primary-200">Online</span>
                    </h1>
                    <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto font-medium">
                        Browse our wide selection of medicines. Get genuine products delivered to your doorstep with trusted quality and convenience.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2 relative z-20">
                        <div className="flex-1 flex items-center px-4 bg-industrial-50 rounded-lg border border-industrial-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                            <Search className="w-5 h-5 text-industrial-400 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search medicines, categories, manufacturers..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3 text-industrial-900 placeholder:text-industrial-400 text-[15px] font-medium"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-industrial-200 rounded-full transition-colors">
                                    <X className="w-4 h-4 text-industrial-500" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden px-4 py-3 bg-industrial-100 hover:bg-industrial-200 text-industrial-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container max-w-7xl mx-auto px-6 -mt-6 relative z-20 pb-24">
                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <div className={`${showFilters ? 'block fixed inset-0 bg-white z-50 p-6 overflow-y-auto md:static md:bg-transparent md:p-0' : 'hidden'} md:block w-full md:w-72 shrink-0`}>
                        {/* Mobile header */}
                        <div className="flex items-center justify-between mb-6 md:hidden">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-industrial-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border border-industrial-200 shadow-sm p-5 sticky top-24 space-y-6">
                            <div className="flex items-center gap-2 text-[13px] font-bold text-industrial-500 uppercase tracking-widest border-b border-industrial-100 pb-3">
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-bold text-industrial-900 mb-3 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-primary-500" />
                                    Categories
                                </h3>
                                <div className="space-y-1.5">
                                    <button
                                        onClick={() => { setSelectedCategory(null); setShowFilters(false); }}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${!selectedCategory
                                            ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm'
                                            : 'text-industrial-600 hover:bg-industrial-50 border border-transparent'
                                            }`}
                                    >
                                        All Categories ({initialMedicines.length})
                                    </button>
                                    {categories.map((cat) => {
                                        const count = initialMedicines.filter(m => m.MedicineCategoryID === cat.MedicineCategoryID).length;
                                        return (
                                            <button
                                                key={cat.MedicineCategoryID}
                                                onClick={() => { setSelectedCategory(cat.MedicineCategoryID); setShowFilters(false); }}
                                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${selectedCategory === cat.MedicineCategoryID
                                                    ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm'
                                                    : 'text-industrial-600 hover:bg-industrial-50 border border-transparent'
                                                    }`}
                                            >
                                                <span>{cat.CategoryName}</span>
                                                <span className="text-xs bg-industrial-100 text-industrial-500 px-2 py-0.5 rounded-full font-bold">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-sm font-bold text-industrial-900 mb-3 flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                                    Price Range
                                </h3>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min={0}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full accent-primary-600"
                                    />
                                    <div className="flex items-center justify-between text-sm text-industrial-600 font-medium">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="text-sm font-bold text-industrial-900 mb-3">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-industrial-200 bg-industrial-50 text-sm font-medium text-industrial-700 focus:ring-2 focus:ring-primary-500 outline-none"
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
                                    className="w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-industrial-200 shadow-sm">
                            <div>
                                <h2 className="text-xl font-bold text-industrial-900">
                                    {selectedCategory
                                        ? categories.find(c => c.MedicineCategoryID === selectedCategory)?.CategoryName
                                        : "All Medicines"
                                    }
                                </h2>
                                <p className="text-sm text-industrial-500 font-medium mt-0.5">
                                    Showing {filteredMedicines.length} of {initialMedicines.length} products
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1.5 bg-white border border-industrial-200 text-industrial-600 rounded-lg text-[13px] font-bold tracking-wide flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {filteredMedicines.length} Products
                                </div>
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="md:hidden px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg text-[13px] font-bold flex items-center gap-2"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* Active Filter Tags */}
                        {(selectedCategory || searchQuery) && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-full text-xs font-bold">
                                        {categories.find(c => c.MedicineCategoryID === selectedCategory)?.CategoryName}
                                        <button onClick={() => setSelectedCategory(null)} className="hover:bg-primary-200 rounded-full p-0.5 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-industrial-100 text-industrial-700 border border-industrial-200 rounded-full text-xs font-bold">
                                        &quot;{searchQuery}&quot;
                                        <button onClick={() => setSearchQuery("")} className="hover:bg-industrial-200 rounded-full p-0.5 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {filteredMedicines.map((med) => (
                                <Link
                                    key={med.MedicineID}
                                    href={`/user/components/phm/medicines/${med.MedicineID}`}
                                    className="group bg-white rounded-xl border border-industrial-200 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 overflow-hidden flex flex-col relative no-underline"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 p-8 flex items-center justify-center h-48 overflow-hidden">
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full border ${getCategoryColor(med.phm_medicinecategory?.CategoryName || '')}`}>
                                                {med.phm_medicinecategory?.CategoryName || "General"}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex gap-1.5">
                                                <span className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer">
                                                    <Heart className="w-4 h-4 text-industrial-400 hover:text-red-500 transition-colors" />
                                                </span>
                                                <span className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors cursor-pointer">
                                                    <Eye className="w-4 h-4 text-industrial-400 hover:text-primary-500 transition-colors" />
                                                </span>
                                            </div>
                                        </div>
                                        <Pill className="w-16 h-16 text-primary-300 group-hover:text-primary-400 transition-colors group-hover:scale-110 transform duration-300" />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h3 className="text-[16px] font-bold text-industrial-900 mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2" title={med.MedicineName}>
                                                {med.MedicineName}
                                            </h3>
                                            {med.Manufacturer && (
                                                <p className="text-[13px] text-industrial-500 font-medium mb-3 flex items-center gap-1.5">
                                                    <Package className="w-3.5 h-3.5 text-industrial-400" />
                                                    {med.Manufacturer}
                                                </p>
                                            )}
                                        </div>

                                        {/* Rating placeholder */}
                                        <div className="flex items-center gap-1 mb-3">
                                            {[1, 2, 3, 4].map((s) => (
                                                <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            ))}
                                            <Star className="w-3.5 h-3.5 text-industrial-200 fill-industrial-200" />
                                            <span className="text-[12px] text-industrial-500 font-medium ml-1">(4.0)</span>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-center justify-between pt-3 border-t border-industrial-100">
                                            <div>
                                                <div className="flex items-center gap-1 text-industrial-900 font-extrabold text-xl">
                                                    <IndianRupee className="w-4 h-4" />
                                                    {Number(med.Price).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 text-white rounded-lg text-[13px] font-bold group-hover:bg-primary-700 transition-colors shadow-sm">
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                                View
                                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredMedicines.length === 0 && (
                            <div className="col-span-full py-24 bg-white rounded-xl border border-industrial-200 text-center shadow-sm flex flex-col items-center justify-center">
                                <Package className="w-16 h-16 mx-auto mb-4 text-industrial-300" />
                                <h3 className="text-xl font-bold text-industrial-900 mb-2">No Medicines Found</h3>
                                <p className="text-industrial-500 max-w-md mx-auto font-medium text-[15px]">
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
                                    className="mt-6 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
