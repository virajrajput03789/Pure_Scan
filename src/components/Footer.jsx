import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 px-2 mt-auto">
      <div className="max-w-screen-xl mx-auto text-center text-xs sm:text-sm">
        <p className="leading-relaxed">
          &copy; {new Date().getFullYear()} PureScan. All rights reserved.
        </p>
        <p className="font-semibold text-green-400 mt-1">
          Designed by Viraj Rajput
        </p>
      </div>
    </footer>
  );
};

export default Footer;