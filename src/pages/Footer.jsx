import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-800 text-white py-6 px-4 mt-auto"
    >
      <div className="max-w-screen-xl mx-auto text-center text-xs sm:text-sm space-y-3">
        {/* Links section */}
        <div className="flex flex-wrap justify-center gap-6">
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              `transition-colors ${
                isActive ? 'text-green-400 font-semibold' : 'hover:text-green-400'
              }`
            }
          >
            Privacy Policy
          </NavLink>
        </div>

        {/* Copyright + credit */}
        <p className="leading-relaxed">
          &copy; {new Date().getFullYear()} PureScan. All rights reserved.
        </p>
        <p className="font-semibold text-green-400">
          Designed by Viraj Rajput
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;