import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Smart Food Analyzer. All rights reserved.
          <span className="font-semibold text-green-400 block sm:inline mt-1 sm:mt-0"><br/>
            {' '}Designed by Viraj Rajput.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;