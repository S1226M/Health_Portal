"use client"

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { useState } from 'react'

// --- IMPORTANT: Swiper CSS Imports ---
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function VideoConsult() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'general', name: 'General Physician' },
    { id: 'dermatology', name: 'Dermatology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'gynecology', name: 'Gynecology' },
    { id: 'psychiatry', name: 'Psychiatry' },
    { id: 'cardiology', name: 'Cardiology' },
  ]

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      experience: '15 years',
      rating: 4.8,
      reviews: 1245,
      price: 299,
      available: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      experience: '12 years',
      rating: 4.9,
      reviews: 892,
      price: 399,
      available: true,
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: 4.7,
      reviews: 1567,
      price: 349,
      available: true,
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Psychiatry',
      experience: '18 years',
      rating: 4.9,
      reviews: 678,
      price: 499,
      available: true,
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecology',
      experience: '14 years',
      rating: 4.8,
      reviews: 1123,
      price: 399,
      available: true,
    },
    {
      id: 6,
      name: 'Dr. Robert Kumar',
      specialty: 'Cardiology',
      experience: '20 years',
      rating: 4.9,
      reviews: 987,
      price: 599,
      available: true,
    },
  ]

  return (
    <main className="min-h-screen bg-white pt-10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="bg-[#f5ebe6] rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Skip the travel!<br />
                Take Online Doctor Consultation
              </h1>

              <p className="text-lg text-gray-600">
                Private consultation + Audio call · Starts at just ₹199
              </p>

              {/* Doctor Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">+139 Doctors are online</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-[#20a4d8] hover:bg-[#1890c2] text-white font-semibold px-8 py-3 rounded-md text-lg transition-colors">
                Consult Now
              </button>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Verified Doctors</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Digital Prescription</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Free Followup</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop"
                alt="Woman consulting online doctor"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        {/* Header: Text Left, Button Right */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">15+ Specialities</h2>
            <p className="mt-2 text-gray-600">Consult with top doctors across specialities</p>
          </div>
          <Link href="/" className="mt-4 md:mt-0 px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Specialities
          </Link>
        </div>

        {/* Specialty Filter Buttons */}
        {/* <div className="flex flex-wrap gap-3 mb-8">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setSelectedSpecialty(specialty.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpecialty === specialty.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {specialty.name}
            </button>
          ))}
        </div> */}

        {/* Grid of Specialty Cards */}
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

      {/* Specialties Section */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        {/* Header: Text Left, Button Right */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">Common Health Concerns</h2>
            <p className="mt-2 text-gray-600">Consult a doctor online for any health issue</p>
          </div>
          <Link href="/" className="mt-4 md:mt-0 px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Specialities
          </Link>
        </div>

        {/* Specialty Filter Buttons */}
        {/* <div className="flex flex-wrap gap-3 mb-8">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setSelectedSpecialty(specialty.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpecialty === specialty.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {specialty.name}
            </button>
          ))}
        </div> */}

        {/* Grid of Specialty Cards */}
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
                <h4 className="text-sm font-bold text-gray-700">Period Pain</h4>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer h-full">
              <img src="https://via.placeholder.com/150" className="w-full h-32 object-cover rounded-t-lg" alt="Acne Pimple" />
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-700">Cough & Cold?</h4>
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

      {/* All Doctors Grid Section */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">Offers</h2>
          </div>
        </div>

        {/* Two Offer Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card - Download App Offer */}
          <div className="bg-[#9cd6c8] rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block bg-white px-4 py-1 rounded text-sm font-semibold text-gray-800 mb-4">
                CARE FIRST
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Trusted Care for<br />You & Your Family
              </h3>
              <button className="flex items-center gap-2 mt-6 text-lg font-semibold text-gray-900 hover:gap-3 transition-all">
                Learn More
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {/* <img
              src="/placeholder.svg?height=200&width=150"
              alt="App mockup"
              className="absolute bottom-0 right-8 h-48 w-auto"
            /> */}
          </div>

          {/* Right Card - Consultation Offer */}
          <div className="bg-[#f9c89b] rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block bg-white px-4 py-1 rounded text-sm font-semibold text-gray-800 mb-4">
                OFFER
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Consult with specialists at<br />just ₹199
              </h3>
              <button className="flex items-center gap-2 mt-6 text-lg font-semibold text-gray-900 hover:gap-3 transition-all">
                Consult Now
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <img
              src="/placeholder.svg?height=250&width=200"
              alt="Doctor"
              className="absolute bottom-0 right-0 h-64 w-auto"
            />
          </div>
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      <div className="max-w-7xl mx-auto px-8 mb-20">
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
        </div>

        {/* Steps */}
        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-semibold">01.</span>
            <p className="text-gray-700">
              Select a speciality or symptom
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-semibold">02.</span>
            <p className="text-gray-700">
              Audio or video call with a verified doctor
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-blue-600 font-semibold">03.</span>
            <p className="text-gray-700">
              Get a digital prescription and free follow-up
            </p>
          </div>

        </div>
      </div>

    </main>
  )
}