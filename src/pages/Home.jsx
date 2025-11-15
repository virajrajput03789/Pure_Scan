import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import kaedeAnim from "../assets/kaede.json";
import BackgroundParticles from "../pages/BackgroundParticles"; // ✅ Added

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100 text-gray-800 overflow-hidden"
    >
      {/* 🌌 Context-Aware Particles for FoodScan */}
      <BackgroundParticles type="food" />

      {/* Hero Section */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-6 pb-12 text-center bg-gradient-to-b from-white to-green-50 space-y-6">
        {/* 🔮 Glow Ring */}
        <div className="absolute w-64 h-64 rounded-full bg-green-300 opacity-20 blur-2xl animate-pulse -z-10" />

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
          className="text-4xl font-bold bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 bg-clip-text text-transparent drop-shadow-sm"
        >
          Eat Smarter. Live Better.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-700 max-w-2xl"
        >
          PureScan Helps You To Scan a Food Products Barcode And Understand Their Nutritional Value, And Make Informed Choices — Instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.div
            whileTap={{
              scale: 0.95,
              boxShadow: "0 0 20px rgba(34,197,94,0.5)"
            }}
            className="relative inline-block"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 animate-[spin_4s_linear_infinite] blur-sm opacity-30" />
            <Link
              to="/select-scan"
              className="relative z-10 inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 hover:shadow-xl transition transform hover:scale-105"
            >
              Start Scanning
            </Link>
          </motion.div>
        </motion.div>
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
          {[
            {
              img: "/scanItem1.jpg",
              title: "Scan Products",
              desc: "Instant barcode scanning for food items and cosmetics."
            },
            {
              img: "/HealthScores.jpg",
              title: "Health Score",
              desc: "Get a clear score based on nutrition, additives, and ingredients."
            },
            {
              img: "/PrivacyFirst.jpg",
              title: "Privacy First",
              desc: "No ads, no data sharing — your health, your control."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "#22c55e",
                boxShadow: "0 0 12px rgba(34,197,94,0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-green-400"
            >
              <motion.img
                src={item.img}
                alt={item.title}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mx-auto w-14 h-14 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

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
          className="text-2xl font-bold text-green-700 mb-4"
        >
          Join the Movement
        </motion.h2>
        <p className="text-gray-700 mb-6">
          Thousands are choosing smarter food habits every day. Be part of the change.
        </p>
        <motion.div
          whileTap={{
            scale: 0.95,
            boxShadow: "0 0 12px rgba(234,179,8,0.4)"
          }}
        >
          <Link
            to="/aboutUs"
            className="inline-block bg-green-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:scale-105 transition transform"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;