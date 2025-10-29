import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import kaedeAnim from "../assets/kaede.json";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-white text-gray-800"
    >
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center px-6 pt-6 pb-12 text-center">
        <div className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-48 h-48 mx-auto"
          >
            <Lottie animationData={kaedeAnim} loop={true} />
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl font-bold text-green-600"
          >
            Eat Smarter. Live Better.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg text-gray-700"
          >
            PureScan Helps You To Scan a Food Products Barcode And Understand Their Nutritional Value, And Make Informed Choices — Instantly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link
              to="/select-scan"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition"
            >
              Start Scanning
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-all duration-200"
          >
            <img src="/scanItem1.jpg" alt="Scan" className="mx-auto w-15 h-15 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Scan Products</h3>
            <p className="text-gray-600 mt-2">Instant barcode scanning for food items and cosmetics.</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-all duration-200"
          >
            <img src="/HealthScores.jpg" alt="Score" className="mx-auto w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Health Score</h3>
            <p className="text-gray-600 mt-2">Get a clear score based on nutrition, additives, and ingredients.</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-all duration-200"
          >
            <img src="/PrivacyFirst.jpg" alt="Privacy" className="mx-auto w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-green-700">Privacy First</h3>
            <p className="text-gray-600 mt-2">No ads, no data sharing — your health, your control.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Join the Movement</h2>
        <p className="text-gray-700 mb-6">
          Thousands are choosing smarter food habits every day. Be part of the change.
        </p>
        <Link
          to="/aboutUs"
          className="inline-block bg-green-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
        >
          Learn More
        </Link>
      </section>
    </motion.div>
  );
};

export default Home;
