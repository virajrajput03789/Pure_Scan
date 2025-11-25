import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import Particles from 'react-tsparticles';

const ContactUs = () => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
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
      tiltY.set(nx * 8);
      tiltX.set(ny * 6);
      orb1X.set(nx * -30);
      orb1Y.set(ny * -20);
      orb2X.set(nx * 22);
      orb2Y.set(ny * 16);
    };

    const onLeave = () => {
      [mouseX, mouseY, tiltX, tiltY, orb1X, orb1Y, orb2X, orb2Y].forEach(mv =>
        animate(mv, 0, { type: 'spring', stiffness: 80, damping: 12 })
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
  }, [mouseX, mouseY, tiltX, tiltY, orb1X, orb1Y, orb2X, orb2Y]);

  const rotateY = useTransform(tiltY, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(tiltX, [-0.5, 0.5], [6, -6]);
  const orbYSpring1 = useTransform(orb1Y, [-0.5, 0.5], [-20, 20]);
  const orbYSpring2 = useTransform(orb2Y, [-0.5, 0.5], [-18, 18]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col min-h-screen items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-white via-green-50 to-white"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Ultra Particle Background */}
      <Particles
        className="absolute inset-0 -z-20"
        options={{
          particles: {
            number: { value: 60, density: { enable: true, value_area: 900 } },
            color: { value: ["#22c55e", "#10b981", "#34d399", "#a7f3d0"] },
            shape: { type: "circle" },
            opacity: { value: 0.15, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 0.3, random: true }
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

      {/* Main 3D Card */}
      <motion.main
        style={{ rotateY, rotateX }}
        whileHover={{ scale: 1.018, boxShadow: "0 20px 70px rgba(16,185,129,0.35)" }}
        transition={{ type: "spring", stiffness: 130, damping: 18 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-3xl p-8 max-w-3xl w-full mt-10 z-10 space-y-8 text-gray-800 border border-white/30 relative overflow-hidden"
      >
        {/* Header */}
        <motion.div whileHover={{ scale: 1.02 }} className="text-center space-y-2">
          <motion.h1
            whileHover={{ scale: 1.08, textShadow: "0px 0px 20px rgba(34,197,94,0.85)" }}
            animate={{
              textShadow: [
                "0 0 4px rgba(13,148,136,0.7)",
                "0 0 10px rgba(13,148,136,0.9)",
                "0 0 4px rgba(13,148,136,0.7)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 tracking-wide animate-pulse"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scaleX: 1.1 }}
            className="h-1 bg-green-500 w-28 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* Content & Form */}
        <motion.div className="space-y-6">
          <motion.p
            whileHover={{ scale: 1.03, color: "#065f46", x: 2 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="text-center text-gray-700 text-base font-medium cursor-default"
          >
            Have questions, feedback, or partnership ideas? We'd love to hear from you. Fill out the form below or reach us directly via email.
          </motion.p>

          <motion.form className="space-y-6">
            {['name', 'email', 'message'].map((field) => (
              <motion.div
                key={field}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <motion.label
                  htmlFor={field}
                  whileHover={{ scale: 1.05, color: "#16a34a", x: 2 }}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {field === 'name' && 'Name'}
                  {field === 'email' && 'Email'}
                  {field === 'message' && 'Message'}
                </motion.label>
                {field === 'message' ? (
                  <motion.textarea
                    id="message"
                    rows="5"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 12px rgba(34,197,94,0.3)" }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder="Write your message here..."
                  />
                ) : (
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 12px rgba(34,197,94,0.3)" }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm"
                    placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.07, backgroundColor: "#059669", boxShadow: "0px 6px 18px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all shadow-md"
            >
              Send Message
            </motion.button>
          </motion.form>

          <motion.div whileHover={{ scale: 1.03 }} className="text-center text-sm text-gray-500 mt-4">
            Or email us directly at{' '}
            <motion.a
              href="mailto:support@purescan.com"
              whileHover={{ color: "#16a34a", textDecoration: "underline", scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="text-green-600 underline cursor-pointer"
            >
              support@purescan.com
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default ContactUs;

