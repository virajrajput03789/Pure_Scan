import React from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-white text-gray-800"
    >
      <main className="flex-grow container mx-auto px-6 pt-6 pb-12">
        <div className="relative w-fit mx-auto mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl font-bold text-green-700 text-center animate-pulse"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="h-1 bg-green-500 w-full mt-1 rounded origin-left"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto space-y-8 text-center"
        >
          <p className="text-gray-700 leading-relaxed">
            PureScan is built to help people make better food choices. It scans food items, evaluates
            their nutritional quality, and helps users stay aware of what they consume daily.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our goal is to simplify food awareness using modern technology and science-backed nutrition data —
            so that choosing healthy products becomes effortless.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower everyone to eat smarter, live better, and understand food in a way that promotes lifelong wellness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Why Choose Us</h2>
            <ul className="list-disc list-inside text-left inline-block text-gray-700 space-y-2">
              <li>Instant product scanning and nutrition analysis</li>
              <li>AI-based health recommendations</li>
              <li>Trusted data and ingredient breakdown</li>
              <li>Minimal design, easy to use interface</li>
              <li>100% privacy-focused — no data sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To build a world where food transparency is universal, and every individual can make healthy decisions with confidence.
            </p>
          </section>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default AboutUs;