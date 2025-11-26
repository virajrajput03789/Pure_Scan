// src/pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto max-w-3xl px-6 py-10 font-sans text-gray-900 min-h-screen"
    >
      {/* ✨ Soft Premium Background Glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-green-200 to-emerald-300 blur-[120px]"
      />

      {/* ✨ Sparkle Light Sweep */}
      <motion.div
        aria-hidden
        animate={{ x: ["-20%", "120%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {/* Actual Content Card */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 overflow-hidden"
      >
        {/* Card interior sparkle */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none"
        />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent drop-shadow"
        >
          Privacy Policy
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-3 leading-relaxed">
          We value your privacy. This policy explains what data we collect, how we use it, and your rights.
        </motion.p>

        {/* Sections */}
        <Section title="Information we collect" fadeUp={fadeUp}>
          <li>Usage data: pages visited, interactions, device type.</li>
          <li>Consent data: choices made via the CMP for EEA/UK/Swiss visitors.</li>
          <li>Ad-related data: collected by third parties like Google AdSense.</li>
        </Section>

        <Section title="Cookies and advertising" fadeUp={fadeUp}>
          We use cookies to improve experience and for advertising via Google AdSense.  
          Users in the EEA/UK/Switzerland get a CMP banner automatically to manage choices.
        </Section>

        <Section title="Use of Google AdSense" fadeUp={fadeUp}>
          Google may use cookies or device identifiers to serve ads.  
          Ads help support this platform; we ensure they remain respectful & non-intrusive.
        </Section>

        <Section title="Data retention and security" fadeUp={fadeUp}>
          We retain data only as long as necessary and use industry-standard protection to
          prevent unauthorized access.
        </Section>

        <Section title="Your rights" fadeUp={fadeUp}>
          <li>Access, update, or delete your data where applicable.</li>
          <li>Withdraw or modify consent via the CMP settings.</li>
          <li>Request more information about how your data is handled.</li>
        </Section>

        <Section title="Contact" fadeUp={fadeUp}>
          For privacy inquiries, contact us via the Contact page or email:  
          <span className="font-semibold text-green-700"> support@purescan.example</span>
        </Section>
      </motion.div>
    </motion.main>
  );
}

/* REUSABLE SECTION COMPONENT */
function Section({ title, children, fadeUp }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-green-700">{title}</h2>

      {/* 3D + Lift Hover */}
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
          boxShadow: "0 12px 40px rgba(16,185,129,0.15)"
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="bg-white/60 border border-white/40 backdrop-blur-lg rounded-xl p-4 shadow-sm"
      >
        {typeof children === "string" ? (
          <p className="text-gray-700 leading-relaxed">{children}</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed">{children}</ul>
        )}
      </motion.div>
    </motion.div>
  );
}
