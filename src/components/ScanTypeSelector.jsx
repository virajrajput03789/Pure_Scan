import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const ScanTypeSelector = () => {
  const navigate = useNavigate();

const handleSelect = (type) => {
  if (type === 'food') {
    navigate('/scan'); // ✅ FoodScan.jsx
  } else if (type === 'cosmetics') {
    navigate('/scan-cosmetics'); // ✅ CosmeticScan.jsx
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4"
    >
     

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-4">
          Choose Scan Category
        </h2>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Select what you'd like to scan — we'll tailor the experience for you.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect('food')}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-500"
          >
            🥗🍎🥑 <span>Food Products</span>
          </button>
          <button
            onClick={() => handleSelect('cosmetics')}
            className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500"
          >
            💄🧴🪞 <span>Cosmetics Products</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScanTypeSelector;