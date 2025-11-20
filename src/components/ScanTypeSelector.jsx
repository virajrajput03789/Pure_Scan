import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScanTypeSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === 'food') navigate('/scan');
    else if (type === 'cosmetics') navigate('/scan-cosmetics');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient circles */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 w-full max-w-md flex flex-col items-center cursor-pointer hover:shadow-4xl transition-shadow duration-500 hover:-translate-y-2 hover:border-green-400 hover:ring-4 hover:ring-green-200"
      >
        <h2 className="text-center text-3xl font-extrabold text-green-700 mb-4">
          Choose Scan Category
        </h2>

        <p className="text-center text-gray-700 mb-10 text-sm">
          Select what you'd like to scan — we’ll tailor the experience for you.
        </p>

        <div className="flex flex-col gap-6 w-full">
          {/* Food Button */}
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 15px 35px rgba(72,187,120,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('food')}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-lime-500 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="text-2xl">🥗🍎🥑</span>
            <span>Food Products</span>
            {/* Subtle shine effect */}
            <span className="absolute inset-0 bg-white/10 pointer-events-none rounded-2xl animate-shimmer"></span>
          </motion.button>

          {/* Cosmetics Button */}
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 15px 35px rgba(236,72,153,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('cosmetics')}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="text-2xl">💄🧴🪞</span>
            <span>Cosmetics Products</span>
            <span className="absolute inset-0 bg-white/10 pointer-events-none rounded-2xl animate-shimmer"></span>
          </motion.button>
        </div>
      </motion.div>

      {/* Add shimmer animation CSS */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 2s infinite;
          border-radius: inherit;
        }
      `}</style>
    </motion.div>
  );
};

export default ScanTypeSelector;




