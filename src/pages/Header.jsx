import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../components/FireBase";
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "About Us", path: "/aboutUs" },
    { label: "Contact Us", path: "/contactUs" },
    { label: "History", path: "/history", auth: true },
    { label: "Profile", path: "/profile", auth: true },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-green-400 bg-opacity-70 backdrop-blur-xl shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + Name */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <motion.img
            src="/logo1.jpg"
            alt="Smart Food Analyzer Logo"
            className="w-10 h-10 rounded-full object-cover shadow-md"
            animate={{
              rotate: [0, 2, -2, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* NEON GLOW PureScan Text (Animated) */}
          <motion.h1
            className="text-xl md:text-2xl font-bold text-white tracking-wide"
            animate={{
              textShadow: [
                "0 0 4px rgba(255,255,255,0.6)",
                "0 0 8px rgba(34,197,94,0.9)",
                "0 0 4px rgba(255,255,255,0.6)",
              ],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            PureScan
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium text-sm">

          {navLinks.map(link =>
            (!link.auth || user) && (
              <motion.div
                key={link.path}
                className="relative group pb-1"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={link.path}
                  className={`transition duration-200 ${
                    location.pathname === link.path ? "font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>

                {/* Center-Expand Underline Animation */}
                <span
                  className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px]
                    bg-white transition-all duration-300 origin-center
                    ${location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"}
                  `}
                ></span>
              </motion.div>
            )
          )}

          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-white text-green-600 px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition"
            >
              Logout
            </motion.button>
          ) : (
            <>
              <Link to="/signin" className="hover:underline">Sign Up</Link>
              <Link
                to="/login"
                className="bg-white text-green-600 px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition"
              >
                Log In
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden px-4 pb-4 flex flex-col gap-3 text-white font-medium 
                       text-sm backdrop-blur-xl bg-green-400/60 rounded-b-2xl shadow-lg"
          >
            {navLinks.map(link =>
              (!link.auth || user) && (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`transition duration-200 ${
                    location.pathname === link.path
                      ? "underline font-semibold"
                      : "hover:underline"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-white text-green-600 px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition"
              >
                Logout
              </motion.button>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMenuOpen(false)} className="hover:underline">Sign Up</Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-white text-green-600 px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition"
                >
                  Log In
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;



