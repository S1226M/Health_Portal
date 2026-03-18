"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
        setIsSubmitting(false);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Hero Banner */}
      <div className="relative overflow-hidden mb-12">
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulseGlow" />

          <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-20 pb-24 text-center animate-slideUpFade">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[13px] font-bold text-primary-200 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-sm shadow-sm opacity-90">
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
              </div>

              <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-5">
                  Contact <span className="text-primary-400">Us</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
                  We're here to help. Get in touch with us for any questions, support, or feedback about our portal.
              </p>
          </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-slideUpFade" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-200 lg:h-full">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">Reach Out</h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 shadow-sm">
                    <MapPin className="text-primary-600 w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-900 mb-1.5 uppercase tracking-widest">Address</h6>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                      123 Healthcare Street,<br />
                      Medical District,<br />
                      City 12345
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 shadow-sm">
                    <Phone className="text-primary-600 w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-900 mb-1.5 uppercase tracking-widest">Phone</h6>
                    <a
                      href="tel:+1234567890"
                      className="text-slate-500 text-[15px] font-medium hover:text-primary-600 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 shadow-sm">
                    <Mail className="text-primary-600 w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-900 mb-1.5 uppercase tracking-widest">Email</h6>
                    <a
                      href="mailto:contact@healthportal.com"
                      className="text-slate-500 text-[15px] font-medium hover:text-primary-600 transition-colors"
                    >
                      contact@healthportal.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <h6 className="text-[14px] font-bold text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-500" /> Business Hours
                </h6>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-bold">Mon - Fri</span>
                        <span className="text-slate-900 font-extrabold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-bold">Saturday</span>
                        <span className="text-slate-900 font-extrabold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-bold">Sunday</span>
                        <span className="text-rose-500 font-extrabold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">Closed</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slideUpFade" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-200 glass">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-[13px] font-extrabold text-slate-600 uppercase tracking-widest">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all hover:border-slate-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-[13px] font-extrabold text-slate-600 uppercase tracking-widest">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all hover:border-slate-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2.5">
                    <label htmlFor="phone" className="text-[13px] font-extrabold text-slate-600 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all hover:border-slate-300"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2.5">
                    <label htmlFor="subject" className="text-[13px] font-extrabold text-slate-600 uppercase tracking-widest">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all hover:border-slate-300 appearance-none"
                        >
                        <option value="" disabled>Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="appointment">Appointment Booking</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2.5 pt-2">
                  <label htmlFor="message" className="text-[13px] font-extrabold text-slate-600 uppercase tracking-widest">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you today?"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all hover:border-slate-300 resize-y"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto gradient-primary hover:shadow-lg text-white font-extrabold text-[15px] px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                        <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                        <><Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
