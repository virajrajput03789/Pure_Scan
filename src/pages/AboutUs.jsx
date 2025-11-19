import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const AboutUs = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen items-center justify-center px-4"
    >
      <motion.main
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-4xl w-full mt-10 z-10 space-y-12 text-gray-800"
      >
        {/* ✅ Header */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-center space-y-2"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 12px rgba(34,197,94,0.8)"
            }}
            className="text-4xl font-bold text-green-700 tracking-tight animate-pulse"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="h-1 bg-green-500 w-24 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* ✅ Content */}
        <div className="space-y-12 text-center">
          {/* Paragraphs */}
          {[
            "PureScan is built to help people make better food choices. It scans food items, evaluates their nutritional quality, and helps users stay aware of what they consume daily.",
            "Our goal is to simplify food awareness using modern technology and science-backed nutrition data — so that choosing healthy products becomes effortless."
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, color: "#065f46" }}
              className="leading-relaxed text-lg transition duration-300 cursor-default"
            >
              {text}
            </motion.p>
          ))}

          {/* Sections */}
          {[
            {
              title: "Our Mission",
              content:
                "To empower everyone to eat smarter, live better, and understand food in a way that promotes lifelong wellness."
            },
            {
              title: "Why Choose Us",
              content: (
                <ul className="list-disc list-inside text-left inline-block space-y-2 text-base">
                  {[
                    "Instant product scanning and nutrition analysis",
                    "AI-based health recommendations",
                    "Trusted data and ingredient breakdown",
                    "Minimal design, easy to use interface",
                    "100% privacy-focused — no data sharing"
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{
                        scale: 1.05,
                        color: "#16a34a",
                        x: 4
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )
            },
            {
              title: "Our Vision",
              content:
                "To build a world where food transparency is universal, and every individual can make healthy decisions with confidence."
            },
            {
              title: "Food Scan",
              content:
                "Instantly scan packaged food items to reveal their nutritional value, additives, and health impact. PureScan helps you avoid harmful ingredients and choose better alternatives — all in one tap."
            },
            {
              title: "Cosmetics Scan",
              content:
                "Decode cosmetic product labels and ingredients to understand their safety, skin impact, and allergen risks. Whether it's shampoo or lipstick, PureScan ensures you're informed before you apply."
            }
          ].map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="space-y-2 transition duration-300 cursor-default"
            >
              <motion.h2
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 6px rgba(34,197,94,0.4)"
                }}
                className="text-2xl font-semibold text-green-600 hover:underline underline-offset-4"
              >
                {section.title}
              </motion.h2>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="leading-relaxed text-base"
              >
                {section.content}
              </motion.div>
            </motion.section>
          ))}
        </div>
      </motion.main>
    </motion.div>
  );
};

export default AboutUs;