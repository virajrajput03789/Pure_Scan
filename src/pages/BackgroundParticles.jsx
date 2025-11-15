import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion } from 'framer-motion';

const palette = {
  food: {
    glow1: "bg-green-500",
    glow2: "bg-yellow-400",
    radial: "from-green-300 via-white to-transparent",
    ring: "border-green-600",
    flash: "bg-yellow-400",
    beam: "via-green-400"
  },
  cosmetic: {
    glow1: "bg-pink-500",
    glow2: "bg-purple-400",
    radial: "from-pink-300 via-white to-transparent",
    ring: "border-pink-600",
    flash: "bg-pink-400",
    beam: "via-pink-400"
  }
};

const ScanLayout = ({ type = "food", showBeam = false, showShockwave = false, children }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const theme = palette[type] || palette.food;

  const foodTheme = {
    number: { value: 140 },
    color: { value: ["#34d399", "#facc15", "#fef3c7", "#10b981"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.35,
      animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false }
    },
    size: {
      value: { min: 1, max: 3.5 },
      animation: { enable: true, speed: 2.5, minimumValue: 0.5, sync: false }
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      outModes: { default: "bounce" }
    },
    links: {
      enable: true,
      color: "#bbf7d0",
      distance: 120,
      opacity: 0.3,
      width: 1
    },
    twinkle: {
      particles: { enable: true, frequency: 0.1, color: "#facc15" }
    }
  };

  const cosmeticTheme = {
    number: { value: 120 },
    color: { value: ["#f9a8d4", "#c084fc", "#fef9c3", "#fcd34d"] },
    shape: { type: "star" },
    opacity: {
      value: 0.3,
      animation: { enable: true, speed: 0.6, minimumValue: 0.1, sync: false }
    },
    size: {
      value: { min: 1, max: 4.5 },
      animation: { enable: true, speed: 2, minimumValue: 0.8, sync: false }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: { default: "bounce" }
    },
    links: {
      enable: true,
      color: "#fbcfe8",
      distance: 100,
      opacity: 0.25,
      width: 1
    },
    twinkle: {
      particles: { enable: true, frequency: 0.12, color: "#f9a8d4" }
    }
  };

  const selectedTheme = type === "cosmetic" ? cosmeticTheme : foodTheme;

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      {/* 🌌 Particle Layer */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#ffffff" } },
          fpsLimit: 60,
          particles: selectedTheme
        }}
        className="absolute inset-0 h-full w-full"
      />

      {/* 🌀 Radial Gradient Pulse */}
      <div
        className={`absolute top-1/2 left-1/2 w-[160vw] h-[160vw] rounded-full bg-gradient-radial ${theme.radial} opacity-35 animate-[pulse_9s_ease-in-out_infinite]`}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* 🌫️ Glow Pulses */}
      <div className={`absolute w-[28rem] h-[28rem] ${theme.glow1} opacity-25 blur-3xl animate-pulse top-16 left-16 rounded-full`} />
      <div className={`absolute w-[24rem] h-[24rem] ${theme.glow2} opacity-25 blur-2xl animate-pulse bottom-24 right-24 rounded-full`} />

      {/* 🧲 Rotating Scan Rings with Blur */}
      {[160, 240, 320, 400, 480].map((size, i) => (
        <div
          key={i}
          className={`absolute top-1/2 left-1/2 w-[${size}px] h-[${size}px] rounded-full ${theme.ring} border animate-[spin_${25 + i * 5}s_linear_infinite] opacity-10 blur-sm`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ))}

      {/* ⚡ Ambient Flash Burst */}
      <div
        className={`absolute inset-0 ${theme.flash} opacity-0 animate-[flashburst_4s_ease-in-out_infinite] pointer-events-none`}
      />

      {/* 🔦 Scanner Beam + Glow Trail */}
      {showBeam && (
        <>
          <div
            className={`absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-white ${theme.beam} to-transparent animate-[scanbeam_2s_linear_infinite]`}
            style={{ transform: "translateX(-50%)" }}
          />
          <div
            className={`absolute top-0 left-1/2 w-[6px] h-full ${theme.beam} opacity-10 blur-2xl animate-[scanbeam_2s_linear_infinite]`}
            style={{ transform: "translateX(-50%)" }}
          />
        </>
      )}

      {/* 💥 Shockwave Burst */}
      {showShockwave && (
        <div
          className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full border-2 border-white opacity-0 animate-[shockwave_1s_ease-out]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      )}

      {/* ✨ Result Reveal Wrapper */}
      {children && (
        <motion.div
          initial={{ rotateY: 90, opacity: 0, scale: 0.95 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="origin-left absolute inset-0 z-10"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default ScanLayout;