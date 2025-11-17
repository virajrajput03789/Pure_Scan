import { motion } from "framer-motion";

const InfoRow = ({ label, value }) => (
  <div className="bg-green-100 text-green-800 p-2 rounded shadow-sm flex justify-between">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const ImpactRow = ({ label, value, max = 20, positive = false }) => {
  const abs = Math.abs(Number(value) || 0);
  const pct = Math.min(100, Math.round((abs / max) * 100));
  const barColor = positive ? 'bg-green-500' : 'bg-red-500';
  const sign = '+';

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className={`font-semibold ${positive ? 'text-green-700' : 'text-red-700'}`}>
          {positive ? `${sign}${abs}` : `${sign}${abs}`}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
        <div className={`${barColor} h-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const NutriScoreBadges = ({ grade }) => {
  const map = {
    A: 'bg-green-800 text-white',
    B: 'bg-green-400 text-black',
    C: 'bg-yellow-300 text-black',
    D: 'bg-orange-400 text-white',
    E: 'bg-red-500 text-white',
  };

  const order = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="flex justify-center gap-2 mb-4">
      {order.map((g) => (
        <span
          key={g}
          className={`px-3 py-1 rounded font-bold text-sm ${g === grade ? map[g] : 'bg-gray-100 text-gray-500'}`}
          aria-label={`Nutri-score ${g}`}
        >
          {g}
        </span>
      ))}
    </div>
  );
};

const FoodResultCard = ({
  score,
  image,
  productName,
  nutrients,
  generateExplanations,
  onReset,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className="mt-8 bg-white border border-gray-200 p-6 rounded-xl shadow-lg max-w-lg mx-auto text-left"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2"
      >
        🛒 {productName}
      </motion.h2>

      {image && (
        <motion.img
          src={image}
          alt="Product"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-40 h-40 object-contain mx-auto rounded border border-gray-300 shadow-sm ring-2 ring-transparent hover:ring-green-400 mb-4"
        />
      )}

      {score?.grade && <NutriScoreBadges grade={score.grade} />}

      <div className="grid grid-cols-2 gap-3 text-sm">
        <InfoRow label="Calories" value={`${nutrients?.calories || 0} kcal`} />
        <InfoRow label="Protein" value={`${nutrients?.protein || 0} g`} />
        <InfoRow label="Fiber" value={`${nutrients?.fiber || 0} g`} />
        <InfoRow label="Energy" value={`${nutrients?.energy || 0} kJ`} />
        <InfoRow label="Sugars" value={`${nutrients?.sugars || 0} g`} />
        <InfoRow label="Sat. Fat" value={`${nutrients?.saturatedFat || 0} g`} />
        <InfoRow label="Sodium" value={`${nutrients?.sodium ? Math.round(nutrients.sodium * 1000) : 0} mg`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 p-4 bg-green-50 border border-green-200 rounded"
      >
        <p className="text-lg font-bold text-green-700">Health Score: {score.value}/100</p>
        <p className="text-sm text-gray-600 mb-2">Based on Nutrition, Additives, and Ingredients</p>

        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
          {Object.entries(score.breakdown || {}).map(([key, value]) => (
            <li key={key}>
              <span className="font-medium capitalize">{key}</span>: {value}
            </li>
          ))}
        </ul>

        <span className="inline-block text-lg font-semibold text-white px-4 py-2 rounded-full bg-green-600 mt-4">
          🅰️ Nutrition Grade: {score.grade}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-gray-700"
      >
        <p className="font-semibold mb-3">Score Breakdown</p>
        <div className="space-y-3">
          <ImpactRow label="Calorie Impact" value={score?.breakdown?.calories} positive={false} max={10} />
          <ImpactRow label="Energy Impact" value={score?.breakdown?.energy} positive={false} max={20} />
          <ImpactRow label="Sugar Impact" value={score?.breakdown?.sugars} positive={false} max={20} />
          <ImpactRow label="Saturated Fat Impact" value={score?.breakdown?.saturatedFat} positive={false} max={20} />
          <ImpactRow label="Sodium Impact" value={score?.breakdown?.sodium} positive={false} max={20} />
          <ImpactRow label="Fiber Benefit" value={score?.breakdown?.fiber} positive={true} max={10} />
          <ImpactRow label="Protein Benefit" value={score?.breakdown?.protein} positive={true} max={10} />
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          This score is calculated from actual nutrient values. We don’t hide unhealthy results — your health deserves honesty.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-sm text-gray-700 space-y-1"
      >
        <p className="font-semibold mb-1">🧠 What this score means:</p>
        {generateExplanations(nutrients, score?.breakdown || {}).length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {generateExplanations(nutrients, score?.breakdown || {}).map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-red-600">
            ⚠️ No nutrient data available to explain this product. Please check the packaging or try another scan.
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2 italic">
          This product received a <strong>{score?.grade}</strong> based on available data. If values are missing, the score may not reflect full accuracy.
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-6 text-sm font-semibold px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition shadow-sm"
      >
        🔄 Scan Another
      </motion.button>
    </motion.div>
  );
};

export default FoodResultCard;