"use client"; // Required for Swiper
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// --- IMPORTANT: Swiper CSS Imports ---
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-10">

      {/* --- Search Bar --- */}
      <div className="flex w-full max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-sm overflow-hidden mb-10">
        <input
          type="text"
          placeholder="Search location"
          className="w-1/3 p-3 outline-none text-gray-700 border-r border-gray-300"
        />
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          className="w-2/3 p-3 outline-none text-gray-700"
        />
      </div>

      {/* --- Top Section Cards (Static Grid - 4 Items) --- */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Link href="/videoconsult/viewconsult" className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-decoration-none">
            <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded-t-lg" alt="Instant Video Consultation" />
            <div className="p-4">
              <h4 className="text-gray-600 font-semibold mx-2">Instant Video Consultation</h4>
            </div>
          </Link>
          {/* Card 2 */}
          <Link href="/admin/components/hop/doctor" className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-decoration-none">
            <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded-t-lg" alt="Find Doctor" />
            <div className="p-4">
              <h4 className="text-gray-600 font-semibold mx-2">Find Doctor Near You</h4>
            </div>
          </Link>
          {/* Card 3 */}
          <Link href="/admin/components/lab/labtest" className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-decoration-none">
            <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded-t-lg" alt="Lab Test" />
            <div className="p-4">
              <h4 className="text-gray-600 font-semibold mx-2">Lab Test</h4>
            </div>
          </Link>
          {/* Card 4 */}
          <Link href="/admin/components/sur/surgery" className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer block text-decoration-none">
            <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded-t-lg" alt="Surgeries" />
            <div className="p-4">
              <h4 className="text-gray-600 font-semibold mx-2">Surgeries</h4>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-20">
        {/* Header: Text Left, Button Right (Centered Vertically) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">Consult top doctors online for any health concern</h2>
            <p className="mt-2 text-gray-600">Private online consultations with verified doctors in all specialists</p>
          </div>
          {/* Note: changed 'to' to 'href' for Next.js */}
          <Link href="/admin/components/hop/specialization" className="mt-4 md:mt-0 px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Specialities
          </Link>
        </div>

        {/* Grid of 6 Cards (6 in one line on large screens) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Period doubts" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Period doubts</h4>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Acne Pimple" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Acne Pimple</h4>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Performance issues" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Performance issues</h4>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Cold, cough" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Cold, cough</h4>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Child not well" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Child not well</h4>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
            <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Depression" />
            <div className="p-3">
              <h4 className="text-sm font-bold text-gray-700">Depression</h4>
            </div>
          </div>

        </div>
      </div>


      {/* --- Consult With Doctor Section (Swiper Slider) --- */}
      <div className="max-w-7xl mx-auto px-8 mb-20">

        {/* Header: Text Left, Button Right */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">Book an appointment for an in-clinic consultation</h2>
            <p className="mt-2 text-gray-600">Find experienced doctors across all specialties</p>
          </div>
        </div>

        {/* SWIPER COMPONENT */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1} // Default for mobile
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2, // Tablet
            },
            768: {
              slidesPerView: 3, // Laptop
            },
            1024: {
              slidesPerView: 4, // <--- CHANGED FROM 6 TO 4
              // slidesPerGroup: 4, // <--- UNCOMMENT THIS if you want to slide 4 cards at a time when clicking arrow
            },
          }}
          className="pb-12"
        >

          {/* Slide 1 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Period doubts" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Period doubts</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Acne Pimple" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Acne Pimple</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Performance issues" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Performance issues</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Cold, cough" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Cold, cough</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Child not well" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Child not well</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Depression" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Depression</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 7 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Extra Item" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Weight Loss</h4>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <hr className="my-12 border-secondary" />

      {/* --- Top Articles Section --- */}
      <div className="max-w-7xl mx-auto px-8 mb-20">

        {/* Flex Container: Stacks vertically on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* --- LEFT SIDE: Text Content (Takes 40-50% width) --- */}
          <div className="w-full md:w-5/12 text-left">
            <h2 className="text-3xl font-bold text-gray-900">Read top articles from health experts</h2>
            <p className="mt-4 text-gray-600 mb-8 leading-relaxed">
              Health articles that keep you informed about good health practices and help you achieve your goals.
            </p>

            {/* Button */}
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              See all Articles
            </Link>
          </div>

          {/* --- RIGHT SIDE: Two Cards (Takes remaining width) --- */}
          <div className="w-full md:w-7/12">
            {/* Grid with 2 columns to keep cards in one line */}
            <div className="grid grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                <img src="https://via.placeholder.com/300x200" className="w-full h-40 object-cover rounded-t-lg" alt="Article 1" />
                <div className="p-4">
                  <span className="text-xs font-bold text-blue-600 uppercase">Coronavirus</span>
                  <h4 className="text-sm font-bold text-gray-800 mt-2 line-clamp-2">
                    12 Coronavirus Myths and Facts That You Should Be Aware Of
                  </h4>
                  <p className="text-xs text-gray-500 mt-3">Dr. Diana Borgio</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                <img src="https://via.placeholder.com/300x200" className="w-full h-40 object-cover rounded-t-lg" alt="Article 2" />
                <div className="p-4">
                  <span className="text-xs font-bold text-blue-600 uppercase">Vitamins</span>
                  <h4 className="text-sm font-bold text-gray-800 mt-2 line-clamp-2">
                    Eating Right to Build Immunity Against Cold and Viral Infections
                  </h4>
                  <p className="text-xs text-gray-500 mt-3">Dr. Diana Borgio</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  )
}