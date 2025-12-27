import React from 'react';
import Link from 'next/link';
// 1. Use your shared DB instance to avoid connection errors
import { db } from "@/lib/prisma";

// 2. Component must be 'async' for data fetching
export default async function SpecializationPage() {
  console.log("DB URL:", process.env.DATABASE_URL);
  // 3. Await the database call. 
  // Note: Prisma 7 naming is usually hOP_Specialization (check your schema)
  const specialitiesFromDB = await db.hop_specialization.findMany({
    where: { IsDeleted: false }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Consult with Top Specialists</h1>
        <p className="text-gray-600 mt-2">Private online consultations with verified doctors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {specialitiesFromDB.map((item) => (
          <Link
            key={item.SpecializationID}
            href={`/hop/doctors?speciality=${item.SpecializationID}`}
            className="group p-6 border rounded-xl hover:shadow-lg transition-all border-gray-100 bg-white"
          >
            <div className="text-4xl mb-4 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-full group-hover:bg-blue-600 transition-colors">
              <span>🩺</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {item.SpecializationName}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {item.Description}
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-blue-600">
              Consult Now →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}