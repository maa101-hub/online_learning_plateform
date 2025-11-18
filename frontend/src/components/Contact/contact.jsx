import React from 'react'
import faqs from './faqs'

const contact = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto bg-blue-50">
    {/* Contact Form */}
    <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-md rounded-lg mb-16">
      <input
        type="text"
        placeholder="Your Name"
        className="p-3 border rounded-md col-span-2 md:col-span-1"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="p-3 border rounded-md col-span-2 md:col-span-1"
      />
      <textarea
        rows="5"
        placeholder="Your Message"
        className="p-3 border rounded-md col-span-2"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded col-span-2 w-full"
      >
        Send Message
      </button>
    </form>

    {/* FAQ Section */}
    <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-md p-5 bg-gray-50 hover:bg-gray-100 transition"
        >
          <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default contact

