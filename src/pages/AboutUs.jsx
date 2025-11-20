import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const AboutUs = () => {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col min-h-screen items-center justify-center px-4 overflow-hidden"
    >

      {/* 🌟 Floating Ambient Glow Lights */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-300/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-green-400/20 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 25, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🔥 Main 3D Card */}
      <motion.main
        style={{ y: heroY, opacity: heroOpacity }}
        whileHover={{
          rotateX: 3,
          rotateY: -5,
          scale: 1.012,
          boxShadow: "0 12px 40px rgba(16,185,129,0.25)"
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-4xl w-full mt-16 z-10 space-y-12 text-gray-800 border border-white/30"
      >
        
        {/* Header */}
        <motion.div whileHover={{ scale: 1.02 }} className="text-center space-y-2">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.08,
              textShadow: "0px 0px 18px rgba(34,197,94,0.75)"
            }}
            className="text-5xl font-bold text-green-700 tracking-tight"
          >
            About Us
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="h-1 bg-green-500 w-28 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* Content */}
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
              whileHover={{
                scale: 1.04,
                color: "#065f46",
                x: 3,
              }}
              className="leading-relaxed text-lg cursor-default"
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
                        scale: 1.06,
                        color: "#16a34a",
                        x: 8,
                        textShadow: "0px 0px 6px rgba(34,197,94,0.4)"
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
                "Decode cosmetic product labels and ingredients to understand their safety, skin impact, and allergen risks. PureScan ensures you're informed before you apply."
            }
          ].map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{
                scale: 1.035,
                boxShadow: "0px 8px 28px rgba(16,185,129,0.15)",
              }}
              className="space-y-3 cursor-default"
            >
              <motion.h2
                whileHover={{
                  scale: 1.08,
                  textShadow: "0px 0px 10px rgba(34,197,94,0.55)"
                }}
                className="text-2xl font-semibold text-green-600 hover:underline underline-offset-4"
              >
                {section.title}
              </motion.h2>

              <motion.div whileHover={{ scale: 1.02 }} className="leading-relaxed">
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

