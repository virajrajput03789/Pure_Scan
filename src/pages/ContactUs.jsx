import React from 'react';


const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      

      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          Contact Us
        </h1>

        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-center text-gray-600">
            Have questions, feedback, or partnership ideas? We'd love to hear from you.
            Fill out the form below or reach us directly via email.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-8">
            Or email us directly at{' '}
            <a href="mailto:support@smartfoodanalyzer.com" className="text-green-600 underline">
              support@smartfoodanalyzer.com
            </a>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default ContactUs;