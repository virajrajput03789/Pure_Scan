import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col min-h-screen items-center justify-center px-4 relative"
    >

      {/* ✨ Floating gradient orbs (background effects) */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-green-300 opacity-30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-teal-300 opacity-30 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.main
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-3xl w-full mt-10 z-10 space-y-8 text-gray-800 relative overflow-hidden"
      >

        {/* ✨ Glass shine animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background:
              [
                "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                "linear-gradient(115deg, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)"
              ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ----------------------------------- */}
        {/*             HEADER AREA             */}
        {/* ----------------------------------- */}
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
              textShadow: "0px 0px 15px rgba(20,150,136,0.9)"
            }}
            animate={{
              textShadow: [
                "0 0 4px rgba(13,148,136,0.7)",
                "0 0 10px rgba(13,148,136,0.9)",
                "0 0 4px rgba(13,148,136,0.7)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 tracking-wide animate-pulse"
          >
            Contact Us
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scaleX: 1.1 }}
            className="h-1 bg-green-500 w-24 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* ----------------------------------- */}
        {/*              CONTENT                */}
        {/* ----------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <motion.p
            whileHover={{
              scale: 1.02,
              color: "#065f46",
              x: 2
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center text-gray-700 text-base font-medium cursor-default"
          >
            Have questions, feedback, or partnership ideas? We'd love to hear from you.
            Fill out the form below or reach us directly via email.
          </motion.p>

          {/* ----------------------------------- */}
          {/*                FORM                */}
          {/* ----------------------------------- */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-6"
          >
            {['name', 'email', 'message'].map((field) => (
              <motion.div
                key={field}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 250 }
                }}
                className="transition duration-300"
              >
                <motion.label
                  htmlFor={field}
                  whileHover={{
                    scale: 1.03,
                    color: "#15803d",
                    x: 2
                  }}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field === 'name' && 'Name'}
                  {field === 'email' && 'Email'}
                  {field === 'message' && 'Message'}
                </motion.label>

                {/* Input/Textarea */}
                {field === 'message' ? (
                  <motion.textarea
                    id="message"
                    rows="5"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 12px rgba(34,197,94,0.3)"
                    }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder="Write your message here..."
                  ></motion.textarea>
                ) : (
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 12px rgba(34,197,94,0.3)"
                    }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
                  />
                )}
              </motion.div>
            ))}

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.07,
                backgroundColor: "#059669",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all shadow-md"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* ----------------------------------- */}
          {/*             EMAIL LINK             */}
          {/* ----------------------------------- */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="text-center text-sm text-gray-500 mt-4"
          >
            Or email us directly at{' '}
            <motion.a
              href="mailto:support@smartfoodanalyzer.com"
              whileHover={{
                color: "#16a34a",
                textDecoration: "underline",
                scale: 1.05
              }}
              transition={{ type: "spring", stiffness: 250 }}
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
