import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-800 text-white py-4 px-2 mt-auto"
    >
      <div className="max-w-screen-xl mx-auto text-center text-xs sm:text-sm">
        <p className="leading-relaxed">
          &copy; {new Date().getFullYear()} PureScan. All rights reserved.
        </p>
        <p className="font-semibold text-green-400 mt-1">
          Designed by Viraj Rajput
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;