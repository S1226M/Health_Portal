import React from "react";

function labTest() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-indigo-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book Diagnostic Tests
          </h1>
          <p className="text-lg mb-8">
            Trusted labs • Home sample collection • Accurate reports
          </p>

          {/* Search */}
          <div className="bg-white rounded-lg shadow flex overflow-hidden max-w-3xl">
            <input
              type="text"
              placeholder="Search for tests, packages"
              className="flex-1 p-4 outline-none text-gray-700"
            />
            <button className="bg-blue-600 text-white px-8">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES ================= */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            "NABL Certified Labs",
            "Home Sample Collection",
            "Accurate Reports",
            "Trusted by Millions",
          ].map((item, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <p className="font-semibold text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POPULAR PACKAGES ================= */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">
            Popular Health Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Full Body Checkup",
              "Diabetes Care",
              "Heart Health",
            ].map((pkg, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{pkg}</h3>
                <p className="text-gray-600 mb-4">
                  Includes 60+ tests
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700 font-bold">₹999</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTS LIST ================= */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">
            Common Lab Tests
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "CBC (Complete Blood Count)",
              "Thyroid Profile",
              "Vitamin D",
              "Vitamin B12",
              "Liver Function Test",
              "Kidney Function Test",
            ].map((test, i) => (
              <div
                key={i}
                className="border rounded-lg p-5 flex justify-between items-center hover:shadow-sm"
              >
                <div>
                  <h3 className="font-medium">{test}</h3>
                  <p className="text-sm text-gray-500">
                    Reports in 24 hrs
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-700">₹399</p>
                  <button className="text-sm text-blue-600 mt-1">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Home Sample Pickup",
              desc: "Get samples collected at your home",
            },
            {
              title: "Certified Labs",
              desc: "Only NABL & ISO labs",
            },
            {
              title: "Fast Reports",
              desc: "Digital reports within 24-48 hrs",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-14 bg-indigo-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Book your diagnostic tests today
        </h2>
        <p className="mb-6">
          Safe • Reliable • Affordable
        </p>
        <button className="bg-white text-indigo-700 px-8 py-3 rounded-md font-semibold">
          Book Now
        </button>
      </section>

    </div>
  );
}

export default labTest;
