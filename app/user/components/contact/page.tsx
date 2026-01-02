"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container py-5">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">Contact Us</h1>
          <p className="text-secondary lead">
            We're here to help. Get in touch with us for any questions or concerns.
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-4">Get in Touch</h3>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 d-flex align-items-center justify-content-center">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Address</h6>
                      <p className="text-secondary small mb-0">
                        123 Healthcare Street,<br />
                        Medical District,<br />
                        City 12345
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 d-flex align-items-center justify-content-center">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Phone</h6>
                      <a href="tel:+1234567890" className="text-secondary text-decoration-none small">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 d-flex align-items-center justify-content-center">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Email</h6>
                      <a href="mailto:contact@practo.com" className="text-secondary text-decoration-none small">
                        contact@practo.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-top">
                  <h6 className="fw-bold mb-3">Business Hours</h6>
                  <p className="text-secondary small mb-1">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-secondary small mb-1">
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  </p>
                  <p className="text-secondary small mb-0">
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-4">Send us a Message</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-medium">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-medium">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label fw-medium">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="appointment">Appointment Booking</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label fw-medium">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Enter your message here..."
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2">
                        <Send size={18} />
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

