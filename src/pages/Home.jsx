import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import kaedeAnim from "../assets/kaede.json";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      <div className="relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-gray-800 font-sans py-12 px-6"
        >
          {/* ✅ Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-48 h-48 mx-auto"
            >
              <Lottie animationData={kaedeAnim} loop={true} />
            </motion.div>

            <motion.div className="text-center space-y-2">
              <motion.h1
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 12px rgba(34,197,94,0.8)"
                }}
                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 tracking-wide animate-pulse"
              >
                Eat Smarter. Live Better.
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                className="h-1 bg-green-500 w-24 mx-auto rounded origin-left"
              />
            </motion.div>

            <motion.p
              whileHover={{ scale: 1.01, color: "#065f46" }}
              className="text-lg text-gray-700 max-w-2xl mx-auto cursor-default"
            >
              PureScan helps you scan food product barcodes and understand their nutritional value and health impact — instantly.
            </motion.p>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/select-scan"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-md hover:shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Start Scanning</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 hover:opacity-20 transition duration-300"></span>
              </Link>
            </motion.div>
          </motion.section>

          {/* ✅ Features Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            {[
              {
                img: "/scanItem1.jpg",
                title: "Scan Products",
                desc: "Instant barcode scanning for food items and cosmetics.",
              },
              {
                img: "/HealthScores.jpg",
                title: "Health Score",
                desc: "Get a clear score based on nutrition, additives, and ingredients.",
              },
              {
                img: "/PrivacyFirst.jpg",
                title: "Privacy First",
                desc: "No ads, no data sharing — your health, your control.",
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
                  borderColor: "#22c55e"
                }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-md border border-transparent hover:border-green-400 cursor-default transition-all duration-300"
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-full"
                />
                <motion.h3
                  whileHover={{
                    scale: 1.02,
                    color: "#059669",
                    textShadow: "0px 0px 6px rgba(34,197,94,0.6)"
                  }}
                  className="text-xl font-semibold text-green-700 transition-all duration-300"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  whileHover={{
                    color: "#4b5563",
                    textDecoration: "underline",
                    textUnderlineOffset: 4
                  }}
                  className="text-gray-600 mt-2 transition-all duration-300"
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* ✅ Call to Action */}
         <motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="py-16 px-6 text-center bg-white"
>
  <motion.h2
    whileHover={{
      scale: 1.05,
      textShadow: "0px 0px 8px rgba(34,197,94,0.6)"
    }}
    className="text-3xl font-extrabold text-green-700 mb-8 underline underline-offset-8 transition-all duration-300"
  >
    Join the Movement
  </motion.h2>

  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.2 }
      }
    }}
    className="max-w-3xl mx-auto space-y-6 text-gray-700 text-base leading-relaxed"
  >
    <motion.p
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ scale: 1.01 }}
    >
      Thousands are choosing smarter food habits every day. Be part of the change.
    </motion.p>

    <motion.p
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ scale: 1.01 }}
    >
      <span className="font-semibold text-green-600">PureScan</span> is more than a scanner — it's a commitment to{" "}
      <span className="text-emerald-600 font-semibold">transparency</span>, health, and{" "}
      <span className="text-emerald-600 font-semibold">empowerment</span>. Whether you're a student, parent, athlete, or just curious, our mission is to help you make informed choices.
    </motion.p>

    <motion.p
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ scale: 1.01 }}
    >
      We believe in <span className="font-medium text-green-700">loyalty-driven design</span>, no ads, and no compromises.
      Your data stays yours. Your health decisions should be based on{" "}
      <span className="text-green-700 font-semibold">truth</span>, not{" "}
      <span className="text-red-500 font-semibold">marketing</span>.
    </motion.p>
  </motion.div>

  <motion.div whileTap={{ scale: 0.95 }} className="mt-10">
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 16px rgba(34,197,94,0.4)"
      }}
      className="inline-block relative"
    >
      <Link
        to="/aboutUs"
        className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition transform shadow-md hover:shadow-lg relative overflow-hidden"
      >
        <span className="relative z-10">Learn More</span>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-green-300 opacity-0 hover:opacity-20 transition duration-300"></span>
             </Link>
           </motion.div>
              </motion.div>
           </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;