import React from "react";
import { motion } from "framer-motion";

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
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-block text-lg font-semibold px-4 py-2 rounded-full shadow-md ${map[grade] || "bg-gray-300 text-black"}`}
    >
      🧴 Grade: {grade}
    </motion.span>
  );
};

const CosmeticResult = ({ data, onReset }) => {
  if (!data) return null;

  const hasFlags = Array.isArray(data.flagged) && data.flagged.length > 0;

  const highlightPhrases = [
    "Limited research on several ingredients",
    "We prioritize transparency over marketing claims",
    "Some ingredients are still under review by dermatology boards",
    "We avoid guessing — honesty first",
    "Ingredient literacy matters — we help you stay informed",
  ];
  const randomPhrase = highlightPhrases[Math.floor(Math.random() * highlightPhrases.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className="mt-8 bg-white border border-gray-200 p-6 rounded-xl shadow-lg max-w-lg mx-auto text-left"
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-pink-600 mb-2"
      >
        💄 {data.name}
      </motion.h3>

      <p className="text-sm text-gray-500 mb-2">
        Brand: <span className="font-medium text-gray-800">{data.brand || "Unknown"}</span>
      </p>

      {data.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <img
            src={data.image}
            alt="Product"
            className="w-40 h-40 object-contain rounded-lg border border-gray-300 shadow-sm"
          />
        </motion.div>
      )}

      {data.grade && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <GradeBadge grade={data.grade} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded"
      >
        <p className="text-md font-semibold text-pink-700">
          Skin Safety: {data.grade === "A" ? "High" : data.grade === "E" ? "Low" : "Moderate"}
        </p>
        <p className="text-sm text-gray-600">Based on flagged risks, vitamins, benefits, and unknowns</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 space-y-2 text-sm text-gray-700"
      >
        <p className="font-semibold mb-1">📊 Score Summary:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{data.breakdown?.flagged === 0 ? "No risky ingredients found ✅" : `${data.breakdown?.flagged} flagged ingredients detected ⚠️`}</li>
          <li>{data.breakdown?.vitamins > 0 ? `${data.breakdown?.vitamins} skin-friendly vitamin${data.breakdown?.vitamins > 1 ? "s" : ""} detected` : "No vitamins found"}</li>
          <li>{data.breakdown?.benefits > 0 ? `${data.breakdown?.benefits} proven benefit${data.breakdown?.benefits > 1 ? "s" : ""}` : "No proven benefits listed"}</li>
          <li>{data.breakdown?.unknown > 20 ? "Many unknowns — limited research ⚠️" : data.breakdown?.unknown > 0 ? `${data.breakdown?.unknown} ingredients need more research` : "All ingredients well-known ✅"}</li>
        </ul>
      </motion.div>

      {hasFlags && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 bg-red-50 border-l-4 border-red-400 p-4 rounded-md"
        >
          <p className="text-red-700 font-semibold mb-1">⚠️ Flagged Ingredients:</p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {data.flagged.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {Array.isArray(data.benefits) && data.benefits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-5 bg-green-50 border-l-4 border-green-400 p-4 rounded-md"
        >
          <p className="text-green-700 font-semibold mb-1">🌿 Benefits:</p>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
            {data.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="mt-5 bg-gray-50 px-4 py-3 rounded-lg text-sm">
        <p className="text-gray-700 mb-1">
          <span className="font-semibold text-gray-900">Suitable for:</span> {data.skinType?.join(", ") || "All skin types"}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold text-gray-900">How to use:</span> {data.usage || "Use as directed"}
        </p>
      </div>

      <div className="mt-5">
        <p className="font-semibold text-red-600 mb-1 text-lg">⚠️ Side Effects:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm">
          {Array.isArray(data.sideEffects) && data.sideEffects.length > 0 ? (
            data.sideEffects.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li>No known side effects reported in public databases or clinical studies.</li>
          )}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-sm text-yellow-800"
      >
        <p className="font-semibold mb-1">🧠 Honest Review:</p>
        <p>
          {hasFlags
            ? "This product includes ingredients that may irritate sensitive skin. Patch test first and avoid daily use if irritation appears."
            : "This product looks safe for daily use based on listed ingredients. Always patch test before full application."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-sm text-gray-700 space-y-1"
      >
        <p className="font-semibold mb-1">🧪 Ingredient Highlights:</p>
        <ul className="list-disc list-inside space-y-1">
          {Array.isArray(data.vitamins) && data.vitamins.length > 0 && (
            <li>✅ {data.vitamins.join(", ")} — skin-friendly</li>
          )}
                    {Array.isArray(data.unknown) && data.unknown.length > 0 && (
            <li>
              ⚠️ {data.unknown.length}+ ingredients have limited research (e.g. {data.unknown.slice(0, 5).join(", ")})
            </li>
          )}
          <li>{randomPhrase}</li>
        </ul>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-6 text-sm font-semibold px-4 py-2 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition shadow-sm"
      >
        🔄 Scan Another
      </motion.button>
    </motion.div>
  );
};

export default CosmeticResult;