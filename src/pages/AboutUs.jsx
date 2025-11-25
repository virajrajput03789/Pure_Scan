import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import Particles from 'react-tsparticles';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0 0", "1 1"] });

  // Hero card parallax + tilt
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroTiltX = useMotionValue(0);
  const heroTiltY = useMotionValue(0);

  // Floating highlights
  const orb1X = useMotionValue(0);
  const orb1Y = useMotionValue(0);
  const orb2X = useMotionValue(0);
  const orb2Y = useMotionValue(0);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(nx);
      mouseY.set(ny);
      heroTiltY.set(nx * 12);
      heroTiltX.set(ny * 8);

      orb1X.set(nx * -40);
      orb1Y.set(ny * -30);
      orb2X.set(nx * 25);
      orb2Y.set(ny * 20);
    };

    const onLeave = () => {
      [mouseX, mouseY, heroTiltX, heroTiltY, orb1X, orb1Y, orb2X, orb2Y].forEach(mv =>
        animate(mv, 0, { type: 'spring', stiffness: 90, damping: 14 })
      );
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('pointermove', onMove);
      node.addEventListener('pointerleave', onLeave);
      node.addEventListener('pointercancel', onLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('pointermove', onMove);
        node.removeEventListener('pointerleave', onLeave);
        node.removeEventListener('pointercancel', onLeave);
      }
    };
  }, [mouseX, mouseY, heroTiltX, heroTiltY, orb1X, orb1Y, orb2X, orb2Y]);

  const rotateYSpring = useTransform(heroTiltY, [-0.5, 0.5], [-10, 10]);
  const rotateXSpring = useTransform(heroTiltX, [-0.5, 0.5], [8, -8]);
  const orbYSpring1 = useTransform(orb1Y, [-0.5, 0.5], [-20, 20]);
  const orbYSpring2 = useTransform(orb2Y, [-0.5, 0.5], [-18, 18]);

  return (
    <motion.div
      ref={containerRef}
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col min-h-screen items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-white via-green-50 to-white"
    >
      {/* Ultra Particle Background */}
      <Particles
        className="absolute inset-0 -z-20"
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 900 } },
            color: { value: ["#22c55e", "#10b981", "#34d399", "#a7f3d0"] },
            shape: { type: "circle" },
            opacity: { value: 0.15, random: true },
            size: { value: 3.5, random: true },
            move: { enable: true, speed: 0.3, direction: "none", random: true, straight: false }
          },
          detectRetina: true
        }}
      />

      {/* Floating Neon Orbs */}
      <motion.div
        style={{ x: orb1X, y: orbYSpring1 }}
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-200 via-emerald-300 to-teal-200 blur-[120px]" />
      </motion.div>
      <motion.div
        style={{ x: orb2X, y: orbYSpring2 }}
        className="absolute -bottom-28 -right-28 w-60 h-60 rounded-full pointer-events-none"
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-emerald-200 to-green-300 blur-[110px]" />
      </motion.div>

      {/* 🔥 Main 3D Hero Card */}
      <motion.main
        style={{ y: heroY, opacity: heroOpacity, rotateY: rotateYSpring, rotateX: rotateXSpring }}
        whileHover={{ scale: 1.018, boxShadow: "0 20px 70px rgba(16,185,129,0.35)" }}
        transition={{ type: "spring", stiffness: 130, damping: 18 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-3xl p-12 max-w-4xl w-full mt-16 z-10 space-y-14 text-gray-800 border border-white/30"
      >
        {/* Header */}
        <motion.div whileHover={{ scale: 1.02 }} className="text-center space-y-3">
          <motion.h1
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.1, textShadow: "0px 0px 22px rgba(34,197,94,0.85)" }}
            className="text-5xl sm:text-6xl font-bold text-green-700 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-green-500 w-32 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-14 text-center">
          {/* Paragraphs */}
          {[
            "PureScan is built to help people make better food choices. It scans food items, evaluates their nutritional quality, and helps users stay aware of what they consume daily.",
            "Our goal is to simplify food awareness using modern technology and science-backed nutrition data — so that choosing healthy products becomes effortless."
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.25 }}
              whileHover={{ scale: 1.05, color: "#065f46", x: 4, textShadow: "0px 0px 6px rgba(16,185,129,0.25)" }}
              className="leading-relaxed text-lg cursor-default"
            >
              {text}
            </motion.p>
          ))}

          {/* Sections */}
          {[
            { title: "Our Mission", content: "To empower everyone to eat smarter, live better, and understand food in a way that promotes lifelong wellness." },
            { title: "Why Choose Us", content: (
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
                    whileHover={{ scale: 1.07, color: "#16a34a", x: 10, textShadow: "0px 0px 8px rgba(34,197,94,0.45)" }}
                    transition={{ type: "spring", stiffness: 320 }}
                    className="cursor-pointer"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            )},
            { title: "Our Vision", content: "To build a world where food transparency is universal, and every individual can make healthy decisions with confidence." },
            { title: "Food Scan", content: "Instantly scan packaged food items to reveal their nutritional value, additives, and health impact. PureScan helps you avoid harmful ingredients and choose better alternatives — all in one tap." },
            { title: "Cosmetics Scan", content: "Decode cosmetic product labels and ingredients to understand their safety, skin impact, and allergen risks. PureScan ensures you're informed before you apply." }
          ].map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.25 }}
              whileHover={{ scale: 1.04, boxShadow: "0px 10px 36px rgba(16,185,129,0.18)" }}
              className="space-y-4 cursor-default"
            >
              <motion.h2
                whileHover={{ scale: 1.09, textShadow: "0px 0px 12px rgba(34,197,94,0.6)" }}
                className="text-2xl font-semibold text-green-600 hover:underline underline-offset-4"
              >
                {section.title}
              </motion.h2>
              <motion.div whileHover={{ scale: 1.025 }} className="leading-relaxed">{section.content}</motion.div>
            </motion.section>
          ))}
        </div>
      </motion.main>
    </motion.div>
  );
};

export default AboutUs;



