import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast'; // ✅ Toast import

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!"); // ✅ Toast feedback
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-green-400 px-4 py-3 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        {/* Left Section - Logo + Name */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo2.jpg"
            alt="Smart Food Analyzer Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
            Smart Food Analyzer
          </h1>
        </div>

        {/* Right Section - Navigation Links */}
        <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 text-gray-800 font-medium">
          <Link to="/home" className="hover:text-white">
            Home
          </Link>
          <Link to="/aboutUs" className="hover:text-white">
            About Us
          </Link>
          <Link to="/contactUs" className="hover:text-white">
            Contact Us
          </Link>

          {user ? (
            <>
              <Link to="/history" className="hover:text-white">
                History
              </Link>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-white">
                Sign Up
              </Link>
              <Link to="/login" className="hover:text-white">
                Log In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;