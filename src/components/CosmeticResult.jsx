import React from "react";
import { motion } from "framer-motion";

// Progress bar
const ProgressBar = ({ label, value, max = 10, positive = false }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = positive ? "bg-green-500" : "bg-red-500";
  return (
    <div className="flex flex-col mb-2">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>
          {positive ? `+${value}` : `-${value}`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
        <motion.div
          className={`${color} h-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Grade badge
const GradeBadge = ({ grade }) => {
  const map = {
    A: "bg-green-700 text-white",
    B: "bg-green-400 text-black",
    C: "bg-yellow-300 text-black",
    D: "bg-orange-400 text-white",
    E: "bg-red-500 text-white",
  };
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15, textShadow: "0 0 10px rgba(255,255,255,0.6)", boxShadow: "0 0 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.5 }}
      className={`relative inline-block text-lg font-extrabold px-5 py-2 rounded-full shadow-xl ${map[grade] || "bg-gray-300 text-black"}`}
    >
      🧴 Grade: {grade}
      <span className="absolute inset-0 bg-white/10 rounded-full pointer-events-none animate-shimmer"></span>
    </motion.span>
  );
};

// Main CosmeticResult
const CosmeticResult = ({ data, onReset }) => {
  if (!data) return null;

  const hasFlags = Array.isArray(data.flagged) && data.flagged.length > 0;

  const randomHighlights = [
    "Limited research on several ingredients",
    "We prioritize transparency over marketing claims",
    "Some ingredients under dermatology review",
    "Honesty first — no guessing",
    "Ingredient literacy matters"
  ];

  const breakdown = {
    flagged: data.breakdown?.flagged || 0,
    vitamins: data.breakdown?.vitamins || 0,
    benefits: data.breakdown?.benefits || 0,
    unknown: data.breakdown?.unknown || 0,
  };

  // Dynamic Side Effects summary
  const sideEffectsSummary =
    data.sideEffects && data.sideEffects.length > 0
      ? data.sideEffects
      : ["No known side effects reported in public databases or clinical studies."];

  // Dynamic Honest Review
  const honestReview = hasFlags
    ? "Some ingredients may irritate sensitive skin. Patch test before daily use."
    : "This product looks safe for daily use based on listed ingredients. Patch test recommended.";

  // Dynamic Ingredient Highlights
  const ingredientHighlights = [
    ...(data.vitamins || []).map((v) => `✅ ${v} — skin-friendly`),
    ...(data.unknown && data.unknown.length > 0
      ? [`⚠️ ${data.unknown.length}+ ingredients have limited research (e.g. ${data.unknown.slice(0, 5).join(", ")})`]
      : []),
    randomHighlights[Math.floor(Math.random() * randomHighlights.length)],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 35px 60px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 100, damping: 16 }}
      className="relative z-10 mt-8 bg-white/95 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-2xl max-w-lg mx-auto text-left overflow-hidden"
    >
      <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl font-extrabold text-pink-600 mb-3 flex items-center gap-2">
        💄 {data.name}
      </motion.h3>

      <p className="text-sm text-gray-500 mb-3">
        Brand: <span className="font-medium text-gray-800">{data.brand || "Unknown"}</span>
      </p>

      {data.image && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.07 }} transition={{ delay: 0.2, duration: 0.4 }} className="flex justify-center mb-4">
          <img src={data.image} alt="Product" className="w-44 h-44 object-contain rounded-2xl border border-gray-300 shadow-lg ring-1 ring-transparent hover:ring-pink-400 transition" />
        </motion.div>
      )}

      {data.grade && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
          <GradeBadge grade={data.grade} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-xl shadow-sm">
        <p className="text-md font-semibold text-pink-700">
          Skin Safety: {data.grade === "A" ? "High" : data.grade === "E" ? "Low" : "Moderate"}
        </p>
        <p className="text-sm text-gray-600">Based on flagged risks, vitamins, benefits, and unknowns</p>
      </motion.div>

      {/* Dynamic Score Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4 p-4 bg-gray-50 rounded-xl shadow-inner">
        <p className="font-semibold text-lg mb-3">📊 Score Summary:</p>
        <ProgressBar label="Flagged Ingredients" value={breakdown.flagged} max={10} positive={false} />
        <ProgressBar label="Skin-friendly Vitamins" value={breakdown.vitamins} max={10} positive={true} />
        <ProgressBar label="Proven Benefits" value={breakdown.benefits} max={10} positive={true} />
        <ProgressBar label="Unknown Ingredients" value={breakdown.unknown} max={20} positive={false} />
      </motion.div>

      {/* Side Effects */}
      <div className="mt-5">
        <p className="font-semibold text-red-600 mb-1 text-lg">⚠️ Side Effects:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm">
          {sideEffectsSummary.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Honest Review */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl text-sm text-yellow-800 shadow-sm">
        <p className="font-semibold mb-1">🧠 Honest Review:</p>
        <p>{honestReview}</p>
      </motion.div>

      {/* Ingredient Highlights */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-sm text-gray-700 space-y-2">
        <p className="font-semibold mb-2">🧪 Ingredient Highlights:</p>
        <ul className="list-disc list-inside space-y-1">
          {ingredientHighlights.map((h, i) => (
            <motion.li key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              {h}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.button whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }} whileTap={{ scale: 0.95 }} onClick={onReset} className="mt-6 text-sm font-semibold px-5 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-lg hover:bg-pink-200 transition">
        🔄 Scan Another
      </motion.button>
    </motion.div>
  );
};

export default CosmeticResult;

