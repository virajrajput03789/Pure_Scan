import { motion } from "framer-motion";

const InfoRow = ({ label, value }) => (
  <div className="bg-green-100 text-green-800 p-2 rounded shadow-sm flex justify-between hover:scale-105 transform transition">
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const ImpactRow = ({ label, value, max = 20, positive = false }) => {
  const abs = Math.abs(Number(value) || 0);
  const pct = Math.min(100, Math.round((abs / max) * 100));
  const barColor = positive ? "bg-green-500" : "bg-red-500";
  const sign = "+";

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className={`font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>
          {positive ? `${sign}${abs}` : `${sign}${abs}`}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
        <motion.div
          className={barColor + " h-full"}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const NutriScoreBadges = ({ grade }) => {
  const map = {
    A: "bg-green-800 text-white",
    B: "bg-green-400 text-black",
    C: "bg-yellow-300 text-black",
    D: "bg-orange-400 text-white",
    E: "bg-red-500 text-white",
  };
  const order = ["A", "B", "C", "D", "E"];

  return (
    <div className="flex justify-center gap-2 mb-4">
      {order.map((g) => (
        <motion.span
          key={g}
          className={`px-3 py-1 rounded font-bold text-sm ${
            g === grade ? map[g] : "bg-gray-100 text-gray-500"
          }`}
          aria-label={`Nutri-score ${g}`}
          whileHover={{ scale: 1.1 }}
        >
          {g}
        </motion.span>
      ))}
    </div>
  );
};

// Dynamic explanations logic
const generateExplanations = (nutrients, breakdown) => {
  const explanations = [];

  const calories = Number(nutrients?.calories || 0);
  if (calories >= 400) explanations.push("🔥 High calories — may lead to weight gain if eaten often.");
  else if (calories >= 150) explanations.push("🔥 Moderate calories — consider portion size.");
  else if (calories > 0) explanations.push("🔥 Low calories — suitable for light snacking.");

  const protein = Number(nutrients?.protein || 0);
  if (protein >= 5) explanations.push("🥬 Protein — helps build and repair muscles; keeps you full.");
  else if (protein > 0) explanations.push("🥬 Low protein — may not keep you full for long.");

  const fiber = Number(nutrients?.fiber || 0);
  if (fiber >= 3) explanations.push("🌾 Fiber — supports digestion and slows sugar absorption.");
  else if (fiber > 0) explanations.push("🌾 Low fiber — may not help digestion much.");

  const sugars = Number(nutrients?.sugars || 0);
  if (sugars >= 10) explanations.push("🍯 High sugar — can contribute to weight gain.");
  else if (sugars > 0) explanations.push("🍯 Moderate sugar — consume in moderation.");

  const satFat = Number(nutrients?.saturatedFat || 0);
  if (satFat >= 5) explanations.push("🥥 High saturated fat — may raise cholesterol.");
  else if (satFat > 0) explanations.push("🥥 Low saturated fat — better for heart health.");

  const sodium = Number(nutrients?.sodium || 0);
  if (sodium >= 500) explanations.push("🧂 High sodium — can raise blood pressure.");
  else if (sodium > 0) explanations.push("🧂 Low sodium — better for blood pressure.");

  if (breakdown?.fiber > 0) explanations.push(`🌾 Fiber benefit: +${breakdown.fiber}`);
  if (breakdown?.protein > 0) explanations.push(`🥬 Protein benefit: +${breakdown.protein}`);

  explanations.push(`💡 Nutrition Grade: ${breakdown?.grade || "N/A"}`);

  return explanations;
};

const FoodResultCard = ({ score, image, productName, nutrients, onReset }) => {
  const explanations = generateExplanations(nutrients, { ...score?.breakdown, grade: score?.grade });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className="mt-8 bg-white border border-gray-200 p-6 rounded-2xl shadow-xl max-w-lg mx-auto text-left hover:shadow-2xl transition"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold text-green-700 mb-3 flex items-center gap-3"
      >
        🛒 {productName}
      </motion.h2>

      {image && (
        <motion.img
          src={image}
          alt="Product"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 0.4 }}
          className="w-48 h-48 object-contain mx-auto rounded-xl border border-gray-300 shadow-md ring-2 ring-transparent hover:ring-green-400 mb-5"
        />
      )}

      {score?.grade && <NutriScoreBadges grade={score.grade} />}

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <InfoRow label="Calories" value={`${nutrients?.calories || 0} kcal`} />
        <InfoRow label="Protein" value={`${nutrients?.protein || 0} g`} />
        <InfoRow label="Fiber" value={`${nutrients?.fiber || 0} g`} />
        <InfoRow label="Energy" value={`${nutrients?.energy || 0} kJ`} />
        <InfoRow label="Sugars" value={`${nutrients?.sugars || 0} g`} />
        <InfoRow label="Sat. Fat" value={`${nutrients?.saturatedFat || 0} g`} />
        <InfoRow label="Sodium" value={`${nutrients?.sodium ? Math.round(nutrients.sodium * 1000) : 0} mg`} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4"
      >
        <p className="text-lg font-bold text-green-700 mb-1">Health Score: {score.value}/100</p>
        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
          {Object.entries(score.breakdown || {}).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium capitalize">{key}</span>: {value}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mt-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200"
>
  <p className="font-bold text-lg mb-3">🧠 What this score means:</p>
  <ul className="space-y-2">
    {explanations.map((line, idx) => {
      // Determine hover color
      let hoverColor = "bg-gray-100";
      if (line.includes("🔥") || line.includes("🍯") || line.includes("🥥")) hoverColor = "bg-red-100";
      if (line.includes("🥬") || line.includes("🌾")) hoverColor = "bg-green-100";

      return (
        <motion.li
          key={idx}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.15, type: "spring", stiffness: 120, damping: 12 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: hoverColor,
            borderRadius: "0.5rem",
            padding: "0.25rem 0.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            transition: { duration: 0.2 },
          }}
          className="cursor-pointer px-2 py-1 rounded transition-all duration-200"
        >
          {line}
        </motion.li>
      );
    })}
  </ul>

  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.15 * explanations.length + 0.2, type: "spring", stiffness: 120, damping: 10, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
    className="mt-4 inline-block px-4 py-2 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-green-500 to-green-700 shadow-md cursor-default"
  >
    💡 Nutrition Grade: {score.grade}
  </motion.div>
</motion.div>



      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-6 text-sm font-semibold px-5 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition shadow-md"
      >
        🔄 Scan Another
      </motion.button>
    </motion.div>
  );
};

export default FoodResultCard;


