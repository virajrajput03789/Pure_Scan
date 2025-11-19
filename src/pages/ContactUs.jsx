import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col min-h-screen items-center justify-center px-4"
    >
      <motion.main
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-3xl w-full mt-10 z-10 space-y-8 text-gray-800"
      >
        {/* ✅ Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="text-center space-y-2"
        >
          <motion.h1
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 12px rgba(13,148,136,0.8)"
            }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 tracking-wide animate-pulse"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="h-1 bg-green-500 w-24 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* ✅ Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <motion.p
            whileHover={{ scale: 1.01, color: "#065f46" }}
            className="text-center text-gray-700 text-base font-medium cursor-default"
          >
            Have questions, feedback, or partnership ideas? We'd love to hear from you.
            Fill out the form below or reach us directly via email.
          </motion.p>

          {/* ✅ Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            {['name', 'email', 'message'].map((field) => (
              <motion.div
                key={field}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.01 }}
                className="transition duration-300"
              >
                <motion.label
                  htmlFor={field}
                  whileHover={{ scale: 1.02, color: "#15803d" }}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field === 'name' && 'Name'}
                  {field === 'email' && 'Email'}
                  {field === 'message' && 'Message'}
                </motion.label>
                {field === 'message' ? (
                  <motion.textarea
                    id="message"
                    rows="5"
                    whileFocus={{ scale: 1.01 }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder="Write your message here..."
                  ></motion.textarea>
                ) : (
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder={
                      field === 'name' ? 'Your name' : 'you@example.com'
                    }
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#059669",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all shadow-md"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* ✅ Email Link */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-center text-sm text-gray-500 mt-4"
          >
            Or email us directly at{' '}
            <motion.a
              href="mailto:support@smartfoodanalyzer.com"
              whileHover={{ color: "#16a34a", textDecoration: "underline" }}
              className="text-green-600 underline cursor-pointer"
            >
              support@purescan.com
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default ContactUs;