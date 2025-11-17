import React from "react";
import { motion } from "framer-motion";

const PureScanFX = () => {
  return (
    <>
      {/* 🌫️ Ambient Mist */}
      <motion.div
        className="fixed inset-0 bg-green-100/5 pointer-events-none z-[-4]"
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* 🔁 Fog Sweep Layer 1 */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-r from-green-300/10 via-green-200/5 to-transparent pointer-events-none z-[-3]"
        animate={{ x: [-1600, 1600] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* 🔁 Fog Sweep Layer 2 */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-r from-green-400/10 via-green-300/5 to-transparent pointer-events-none z-[-2]"
        animate={{ x: [-2000, 2000] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* 🌀 Orbital Glow Pulses */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="fixed w-[400px] h-[400px] bg-green-400 rounded-full blur-[120px] pointer-events-none z-[0]"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10 + i * 2,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
          style={{
            top: `${40 + i * 10}%`,
            left: `${50 + i * 5}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* 🧠 Rotating Scanner Rings */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="fixed border border-green-500 rounded-full blur-[60px] pointer-events-none z-[-1]"
          style={{
            width: `${500 + i * 100}px`,
            height: `${500 + i * 100}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            repeat: Infinity,
            duration: 20 + i * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* ⚡ Grid Scanner — shimmer pulse */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              rgba(34,197,94,0.05) 0px,
              rgba(34,197,94,0.05) 1px,
              transparent 1px,
              transparent 16px
            )
          `,
          backgroundSize: "100% 100%",
        }}
        animate={{ backgroundPositionY: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      />

      {/* ✨ Floating Particles — randomized motion */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="fixed w-2 h-2 bg-green-400 rounded-full blur-sm pointer-events-none z-[0]"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.1,
            scale: 0.8,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

export default PureScanFX;