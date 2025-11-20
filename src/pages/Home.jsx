import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate
} from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import kaedeAnim from "../assets/kaede.json";

/**
 * Level 3 MAX Home.jsx
 * - Ultimate first-impression animations
 * - Full 3D hero depth + mouse driven parallax
 * - Orb lights react to cursor
 * - Cinematic scroll reveals and section choreography
 * - Button layered interactive animation and lighting shift
 *
 * NOTE: Content and original Tailwind classes were preserved exactly.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const containerRef = useRef(null);

  // Scroll parallax (page-level)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0 0", "1 1"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroYSpring = useSpring(heroY, { stiffness: 140, damping: 28 });
  const orbYSpring = useSpring(orbY, { stiffness: 120, damping: 22 });
  const featuresYSpring = useSpring(featuresY, { stiffness: 160, damping: 26 });

  // Cursor motion for hero tilt & orb attraction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orb1X = useMotionValue(0);
  const orb1Y = useMotionValue(0);
  const orb2X = useMotionValue(0);
  const orb2Y = useMotionValue(0);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // normalized -0.5..0.5
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // damp values for motion
      mouseX.set(nx);
      mouseY.set(ny);

      // orbs subtly attracted / repelled
      orb1X.set(nx * -30); // inverse small shift
      orb1Y.set(ny * -20);
      orb2X.set(nx * 22);
      orb2Y.set(ny * 16);
    };

    // transform to reset on leave
    const onLeave = () => {
      animate(mouseX, 0, { type: "spring", stiffness: 80, damping: 12 });
      animate(mouseY, 0, { type: "spring", stiffness: 80, damping: 12 });
      animate(orb1X, 0, { type: "spring", stiffness: 80, damping: 12 });
      animate(orb1Y, 0, { type: "spring", stiffness: 80, damping: 12 });
      animate(orb2X, 0, { type: "spring", stiffness: 80, damping: 12 });
      animate(orb2Y, 0, { type: "spring", stiffness: 80, damping: 12 });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      node.addEventListener("pointercancel", onLeave);
    }
    return () => {
      if (node) {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
        node.removeEventListener("pointercancel", onLeave);
      }
    };
  }, [mouseX, mouseY, orb1X, orb1Y, orb2X, orb2Y]);

  // Map mouseX/Y to rotations for hero, stronger effect
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const rotateYSpring = useSpring(rotateY, { stiffness: 220, damping: 24 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 220, damping: 24 });

  // Button lighting micro-animation helper: CSS variables controlled inline
  const ctaLightX = useMotionValue(50);
  const ctaLightY = useMotionValue(50);

  // animate a gentle idle float for cards
  const idleFloat = {
    animate: { y: [0, -6, 0], rotate: [0, 0.6, 0], transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut" } }
  };

  // cinematic section reveal variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" }
    })
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* ------------------ LAYERED BACKGROUND (volumetric + parallax) ------------------ */}
      {/* Back-most ambient gradient */}
      <motion.div
        aria-hidden
        style={{ y: orbYSpring, x: orb1X }}
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.6 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-200 via-emerald-300 to-teal-200 blur-[90px]" />
      </motion.div>

      {/* Mid orb */}
      <motion.div
        aria-hidden
        style={{ y: orb2Y, x: orb2X }}
        className="absolute right-[-6rem] bottom-[-6rem] w-[26rem] h-[26rem] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-emerald-200 to-green-300 blur-[95px]" />
      </motion.div>

      {/* Foreground subtle dust particles (purely decorative) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ mixBlendMode: "overlay" }}
      >
        {/* a few tiny drifting dots via CSS pseudo duplication would be ideal, but keep simple */}
      </motion.div>

      {/* ------------------ MAIN CONTENT WRAP ------------------ */}
      <div className="relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-800 py-10 px-4 sm:px-6 lg:px-12 font-sans"
        >
          {/* ====================== HERO SECTION ====================== */}
          <motion.section
            style={{ y: heroYSpring }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Hero Lottie (Left visual) - layered with glass frame */}
              <motion.div
                // idle bob + slight rotate for life
                animate={{ y: [0, -12, 0], rotate: [0, 0.6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 md:w-60 md:h-60 flex-shrink-0 relative"
              >
                {/* glass frame shadow + subtle border */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(16,24,40,0.08)"
                  }}
                />
                <div className="w-full h-full p-1 rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Lottie animationData={kaedeAnim} loop />
                  </div>
                </div>
              </motion.div>

              {/* Hero Content Block (Right) — full 3D tilt driven by cursor */}
              <motion.div
                style={{ rotateY: rotateYSpring, rotateX: rotateXSpring }}
                className="flex-1 text-center md:text-left space-y-4"
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <motion.h1
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 text-transparent bg-clip-text tracking-wide relative"
                  // volumetric glow pulses
                  animate={{ filter: ["drop-shadow(0 8px 20px rgba(34,197,94,0.06))", "drop-shadow(0 20px 40px rgba(34,197,94,0.12))", "drop-shadow(0 8px 20px rgba(34,197,94,0.06))"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Eat Smarter. Live Better.

                  {/* Shimmer highlight */}
                  <motion.span
                    animate={{ x: ["-120%", "140%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 opacity-30"
                  />
                </motion.h1>

                <motion.p
                  whileHover={{ scale: 1.02, color: "#065f46" }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto md:mx-0"
                >
                  PureScan helps you scan food product barcodes and understand their
                  nutritional value and health impact — instantly.
                </motion.p>

                {/* CTA — layered button with lighting shift and micro parallax */}
                <motion.div
                  onPointerMove={(e) => {
                    // update CTA light position relative to element
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const lx = ((e.clientX - rect.left) / rect.width) * 100;
                    const ly = ((e.clientY - rect.top) / rect.height) * 100;
                    // animate CSS variables
                    el.style.setProperty("--cta-light-x", `${lx}%`);
                    el.style.setProperty("--cta-light-y", `${ly}%`);
                  }}
                  onPointerLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.setProperty("--cta-light-x", `50%`);
                    el.style.setProperty("--cta-light-y", `50%`);
                  }}
                >
                  <Link
                    to="/select-scan"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-2xl relative overflow-hidden"
                    style={{
                      // layered lighting via pseudo inline style variables (used in nested spans)
                      // we'll use an inline gradient span below reading these variables
                      ["--cta-light-x"]: "50%",
                      ["--cta-light-y"]: "50%"
                    }}
                  >
                    <span className="relative z-10">Start Scanning</span>

                    {/* Layered lighting / ripple span */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileHover={{ opacity: 0.22, scale: 2.2 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at var(--cta-light-x,50%) var(--cta-light-y,50%), rgba(255,255,255,0.18), rgba(255,255,255,0.02) 35%, transparent 60%)",
                        pointerEvents: "none"
                      }}
                    />

                    {/* decorative animated thin highlight */}
                    <motion.span
                      aria-hidden
                      className="absolute -top-6 left-[-20%] w-[140%] h-12 pointer-events-none"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
                      }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* ====================== FEATURES SECTION (multi-layer parallax cards) ====================== */}
          <motion.div
            style={{ y: featuresYSpring }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto"
          >
            {[
              { img: "/scanItem1.jpg", title: "Scan Products", desc: "Instant barcode scanning for food items and cosmetics." },
              { img: "/HealthScores.jpg", title: "Health Score", desc: "Get a clear score based on nutrition, additives, and ingredients." },
              { img: "/PrivacyFirst.jpg", title: "Privacy First", desc: "No ads, no data sharing — your health, your control." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  translateY: -8,
                  scale: 1.07,
                  rotateX: 6,
                  rotateY: idx % 2 === 0 ? 6 : -6,
                  boxShadow: "0px 20px 50px rgba(16,185,129,0.12)"
                }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="backdrop-blur-lg bg-white/70 p-6 rounded-xl shadow-sm border border-transparent hover:border-green-400 transition-all cursor-default relative overflow-hidden"
              >
                {/* layered floating background inside card */}
                <motion.div
                  className="absolute -inset-6 -z-10 rounded-2xl"
                  animate={{
                    rotate: [0, 3, 0],
                    x: [0, -8, 0],
                    y: [0, 6, 0]
                  }}
                  transition={{ duration: 8 + idx, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(135deg, rgba(34,197,94,0.03), rgba(16,185,129,0.02))",
                    filter: "blur(18px)"
                  }}
                />
                <motion.img
                  src={item.img}
                  alt={item.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full shadow-md object-cover"
                />

                <motion.h3
                  whileHover={{ scale: 1.04, color: "#059669" }}
                  className="text-xl font-semibold text-green-700"
                >
                  {item.title}
                </motion.h3>

                <motion.p className="text-gray-600 mt-2">{item.desc}</motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* ====================== CALL TO ACTION (cinematic reveal + lighting shift) ====================== */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="py-16 px-4 text-center max-w-4xl mx-auto mt-20"
          >
            <motion.h2
              animate={{ y: [0, -8, 0], textShadow: ["0 0 0 rgba(0,0,0,0)", "0 12px 40px rgba(34,197,94,0.12)", "0 0 0 rgba(0,0,0,0)"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="font-heading text-3xl sm:text-4xl font-extrabold text-green-700 mb-8 underline underline-offset-8"
            >
              Join the Movement
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.25 } }
              }}
              className="space-y-6 text-gray-700 text-base leading-relaxed"
            >
              <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
                Thousands are choosing smarter food habits every day. Be part of the change.
              </motion.p>

              <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
                <span className="font-semibold text-green-600">PureScan</span> is more than a scanner —
                it's about <span className="text-emerald-600 font-semibold">transparency</span>,
                health, and <span className="text-emerald-600 font-semibold">empowerment</span>.
              </motion.p>

              <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
                We believe in <span className="font-medium text-green-700">loyalty-driven design</span>,
                no ads, no compromises. Your data stays yours.
              </motion.p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.92 }}
              className="mt-10"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0px 20px 60px rgba(34,197,94,0.28)"
                }}
                className="inline-block relative"
              >
                <Link
                  to="/aboutUs"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>

                  {/* layered glow that brightens on hover */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.26 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12), transparent 40%)" }}
                  />

                  {/* cinematic streak */}
                  <motion.span
                    aria-hidden
                    className="absolute -top-6 left-[-20%] w-[140%] h-12 pointer-events-none"
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}




