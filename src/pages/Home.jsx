import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import kaedeAnim from "../assets/kaede.json";
import { GlowingCards, GlowingCard } from "../pages/ScanLayout"; // ✅ New layout
import PureScanFX from "../pages/PureScanFX"; // ✅ Scanner-grade background FX

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden"> {/* ✅ Top-level wrapper */}
      <PureScanFX /> {/* ✅ FX layer now truly behind everything */}

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-50 text-gray-800 font-sans py-12 px-6"
      >
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            className="w-48 h-48 mx-auto"
          >
            <Lottie animationData={kaedeAnim} loop={true} />
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{
              scale: 1.02,
              textShadow: "0px 0px 12px rgba(34,197,94,0.8)",
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 bg-clip-text text-transparent"
          >
            Eat Smarter. Live Better.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            PureScan Helps You To Scan a Food Products Barcode And Understand Their Nutritional Value, And Make Informed Choices — Instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/select-scan"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
              >
                Start Scanning
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
    <GlowingCards>
  {[
    {
      img: "/scanItem1.jpg",
      title: "Scan Products",
      desc: "Instant barcode scanning for food items and cosmetics.",
      glow: "#10b981"
    },
    {
      img: "/HealthScores.jpg",
      title: "Health Score",
      desc: "Get a clear score based on nutrition, additives, and ingredients.",
      glow: "#22c55e"
    },
    {
      img: "/PrivacyFirst.jpg",
      title: "Privacy First",
      desc: "No ads, no data sharing — your health, your control.",
      glow: "#f59e0b"
    }
  ].map((item, idx) => (
    <GlowingCard key={idx} glowColor={item.glow}>
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={item.img}
          alt={item.title}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-14 h-14 mb-4"
        />
        <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
        <p className="text-gray-600 mt-2">{item.desc}</p>
      </div>
    </GlowingCard>
  ))}
</GlowingCards>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-12 px-6 text-center"
        >
          <motion.h2
            whileHover={{
              textDecoration: "underline",
              textUnderlineOffset: 6,
              textShadow: "0px 0px 6px rgba(34,197,94,0.4)"
            }}
            className="text-2xl font-bold text-green-700 mb-4 "
          >
            Join the Movement
          </motion.h2>
          <p className="text-gray-700 mb-6">
            Thousands are choosing smarter food habits every day. Be part of the change.
          </p>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              to="/aboutUs"
              className="inline-block bg-green-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:scale-105 transition transform"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Home;