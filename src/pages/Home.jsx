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
import Particles from "react-tsparticles";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0 0", "1 1"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroYSpring = useSpring(heroY, { stiffness: 140, damping: 28 });
  const orbYSpring = useSpring(orbY, { stiffness: 120, damping: 22 });
  const featuresYSpring = useSpring(featuresY, { stiffness: 160, damping: 26 });

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
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
      orb1X.set(nx * -30);
      orb1Y.set(ny * -20);
      orb2X.set(nx * 22);
      orb2Y.set(ny * 16);
    };

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

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const rotateYSpring = useSpring(rotateY, { stiffness: 220, damping: 24 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 220, damping: 24 });

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
    <div ref={containerRef} className="relative min-h-screen flex flex-col bg-gradient-to-b from-white via-green-50 to-white overflow-hidden font-sans">
      
      {/* Particle Background */}
      <Particles
        className="absolute inset-0 -z-20"
        options={{
          particles: {
            number: { value: 60, density: { enable: true, value_area: 900 } },
            color: { value: ["#22c55e", "#10b981", "#34d399"] },
            shape: { type: "circle" },
            opacity: { value: 0.15, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 0.3, direction: "none", random: true, straight: false }
          },
          interactivity: { events: { onhover: { enable: false } } },
          detectRetina: true
        }}
      />

      {/* Background Orbs */}
      <motion.div
        aria-hidden
        style={{ y: orbYSpring, x: orb1X }}
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18, scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-300 via-emerald-300 to-teal-200 blur-[120px]" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: orb2Y, x: orb2X }}
        className="absolute right-[-6rem] bottom-[-6rem] w-[26rem] h-[26rem] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18, scale: [1, 1.07, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-emerald-200 to-green-300 blur-[120px]" />
      </motion.div>

      {/* Decorative Floating Shapes */}
      <motion.div className="absolute w-12 h-12 rounded-full bg-green-200/30 top-20 left-1/4 -z-10"
        animate={{ y: [0, -15, 0], x: [0, 12, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute w-16 h-16 rounded-full bg-emerald-300/20 bottom-32 right-1/3 -z-10"
        animate={{ y: [0, 20, 0], x: [0, -18, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-800 py-10 px-4 sm:px-6 lg:px-12 font-sans"
        >
          {/* Hero Section */}
          <motion.section
            style={{ y: heroYSpring }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* Lottie Animation */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 0.6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative rounded-3xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-lg"
              >
                {/* Glowing Halo */}
                <motion.div className="absolute inset-0 rounded-3xl"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)", pointerEvents: "none" }}
                />
                <Lottie animationData={kaedeAnim} loop />
              </motion.div>

              {/* Hero Text */}
              <motion.div
                style={{ rotateY: rotateYSpring, rotateX: rotateXSpring }}
                className="flex-1 text-center md:text-left space-y-6"
              >
                <motion.h1
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 text-transparent bg-clip-text tracking-tight relative"
                  animate={{ filter: ["drop-shadow(0 8px 25px rgba(34,197,94,0.08))", "drop-shadow(0 20px 60px rgba(34,197,94,0.16))", "drop-shadow(0 8px 25px rgba(34,197,94,0.08))"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Eat Smarter. Live Better.
                  <motion.span
                    animate={{ x: ["-120%", "140%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 opacity-30"
                  />
                </motion.h1>

                <motion.p
                  whileHover={{ scale: 1.02, color: "#065f46" }}
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0 leading-relaxed"
                >
                  PureScan helps you scan food product barcodes and understand their nutritional value and health impact — instantly.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  onPointerMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const lx = ((e.clientX - rect.left) / rect.width) * 100;
                    const ly = ((e.clientY - rect.top) / rect.height) * 100;
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
                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-2xl relative overflow-hidden"
                    style={{ ["--cta-light-x"]: "50%", ["--cta-light-y"]: "50%" }}
                  >
                    <span className="relative z-10">Start Scanning</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileHover={{ opacity: 0.22, scale: 2.2 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle at var(--cta-light-x,50%) var(--cta-light-y,50%), rgba(255,255,255,0.18), rgba(255,255,255,0.02) 35%, transparent 60%)",
                        pointerEvents: "none"
                      }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.div
            style={{ y: featuresYSpring }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
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
                  translateY: -10,
                  scale: 1.08,
                  rotateX: 6,
                  rotateY: idx % 2 === 0 ? 6 : -6,
                  boxShadow: "0px 25px 60px rgba(16,185,129,0.16)"
                }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="backdrop-blur-xl bg-white/70 p-6 rounded-2xl shadow-sm border border-transparent hover:border-green-400 transition-all relative overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute -inset-6 -z-10 rounded-3xl"
                  animate={{ rotate: [0, 3, 0], x: [0, -8, 0], y: [0, 6, 0] }}
                  transition={{ duration: 8 + idx, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.04), rgba(16,185,129,0.02))", filter: "blur(20px)" }}
                />
                <motion.img
                  src={item.img}
                  alt={item.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg object-cover"
                />
                <motion.h3 whileHover={{ scale: 1.04, color: "#059669" }} className="text-xl font-semibold text-green-700">{item.title}</motion.h3>
                <motion.p className="text-gray-600 mt-2">{item.desc}</motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="py-16 px-4 text-center max-w-4xl mx-auto mt-24"
>
  <motion.h2
    animate={{
      y: [0, -8, 0],
      textShadow: [
        "0 0 0 rgba(0,0,0,0)",
        "0 12px 40px rgba(34,197,94,0.12)",
        "0 0 0 rgba(0,0,0,0)",
      ],
    }}
    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    className="font-heading text-3xl sm:text-4xl font-extrabold text-green-700 mb-8 underline underline-offset-8"
  >
    Join the Movement
  </motion.h2>

  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }}
    className="space-y-6 text-gray-700 text-base leading-relaxed"
  >
    <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
      Thousands are choosing smarter food habits every day. Be part of the change.
      Discover how understanding your product labels can protect your health and well-being.
    </motion.p>
    <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
      <span className="font-semibold text-green-600">PureScan</span> is more than a scanner — it's about <span className="text-emerald-600 font-semibold">transparency</span>, health, and <span className="text-emerald-600 font-semibold">empowerment</span>. Make informed decisions for yourself and your family.
    </motion.p>
    <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
      We believe in <span className="font-medium text-green-700">loyalty-driven design</span>, no ads, no compromises. Your data stays yours. Join our growing community committed to safe, conscious consumption.
    </motion.p>
    <motion.p variants={fadeUp} whileHover={{ scale: 1.02 }}>
      Start scanning today and take the first step towards a healthier lifestyle. Your journey to smarter choices begins here.
    </motion.p>
  </motion.div>

  <motion.div whileTap={{ scale: 0.92 }} className="mt-10">
    <motion.div whileHover={{ scale: 1.08, boxShadow: "0px 20px 60px rgba(34,197,94,0.28)" }} className="inline-block relative">
      <Link
        to="/aboutUs"
        className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-xl relative overflow-hidden"
      >
        <span className="relative z-10">Learn More</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.26 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12), transparent 40%)" }}
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








