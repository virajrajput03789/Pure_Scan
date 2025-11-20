import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Prevent render on Home page
  if (location.pathname === "/") return null;

  const handleBack = () => {
    const blockedRoutes = ["/login", "/signin"];
    if (blockedRoutes.includes(location.pathname)) {
      navigate("/"); // fallback to home or dashboard
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 120, damping: 15 }}
  className="w-full px-4 mt-4 flex"
>
  <motion.button
    onClick={handleBack}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-flex items-center gap-2 text-gray-600 hover:text-white bg-gray-200 hover:bg-green-600
      px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300"
  >
    <span className="text-lg">←</span>
    <span>Back</span>
  </motion.button>
</motion.div>

  );
};

export default BackButton;