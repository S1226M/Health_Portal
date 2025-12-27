import React from "react";

function findDoctor() {
    return (
        <div className="w-full">

            {/* ================= HERO SECTION ================= */}
            <section className="bg-indigo-400 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Your home for health</h1>
                    <p className="mb-8 text-lg">Find and book doctors near you</p>


                    {/* Search Bar */}
                    <div className="flex w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search location"
                            className="w-1/3 p-3 outline-none text-gray-700 border-r border-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="Search doctors, clinics, hospitals"
                            className="w-2/3 p-3 outline-none text-gray-700"
                        />
                    </div>
                </div>
            </section>


            {/* ================= DATA SAFETY ================= */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Safety of your data is our top priority
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✔ Multi-level security checks</li>
                            <li>✔ Multiple data backups</li>
                            <li>✔ Strict data privacy policies</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
                            Read more
                        </button>
                    </div>
                    <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                        Illustration
                    </div>
                </div>
            </section>

            {/* ================= INSTANT APPOINTMENT ================= */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Instant appointment with doctors. <br /> Guaranteed.
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✔ 100,000+ verified doctors</li>
                            <li>✔ 3M+ patient recommendations</li>
                            <li>✔ 25M+ appointments yearly</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
                            Find me the right doctor
                        </button>
                    </div>
                    <div className="h-72 bg-gray-200 rounded-xl flex items-center justify-center">
                        Mobile UI
                    </div>
                </div>
            </section>

            {/* ================= ONLINE CONSULT ================= */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="h-72 bg-gray-200 rounded-xl flex items-center justify-center">
                        App Preview
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Skip the waiting room. <br /> Consult with a doctor
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✔ Fees starting at ₹99</li>
                            <li>✔ Doctors respond in 5 minutes</li>
                            <li>✔ 100% private & confidential</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
                            Consult now
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= ARTICLES ================= */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Read top articles from health experts
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="border rounded-xl p-4 hover:shadow-md transition"
                            >
                                <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                                <h3 className="font-semibold mb-2">
                                    Health Article Title
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Short description of the article content goes here.
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                            More articles
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= MEDICINES ================= */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Get all your medicines. <br /> Everytime. On time.
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✔ Guaranteed availability</li>
                            <li>✔ Over 130,000 medicines</li>
                            <li>✔ Home delivery in 24hrs</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
                            Order medicines
                        </button>
                    </div>
                    <div className="h-60 bg-gray-200 rounded-xl flex items-center justify-center">
                        Medicine Illustration
                    </div>
                </div>
            </section>

            {/* ================= MEDICAL RECORDS ================= */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="h-60 bg-gray-200 rounded-xl flex items-center justify-center">
                        Secure Records
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            All your medical records <br /> In one secure app
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✔ 256-bit end-to-end encryption</li>
                            <li>✔ Access anytime, anywhere</li>
                        </ul>
                        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">
                            Find out more
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= DOWNLOAD APP ================= */}
            <section className="py-16 bg-gray-50 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Download the app
                </h2>
                <p className="text-gray-600 mb-6">
                    Book appointments, consult doctors & order medicines
                </p>

                <div className="flex justify-center gap-4">
                    <button className="bg-black text-white px-6 py-2 rounded-md">
                        Google Play
                    </button>
                    <button className="bg-black text-white px-6 py-2 rounded-md">
                        App Store
                    </button>
                </div>
            </section>

        </div>
    );
}

export default findDoctor;
