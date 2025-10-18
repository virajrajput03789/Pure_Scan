import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between bg-green-400 px-6 py-3 shadow-md">
      {/* Left Section - Logo + Name */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo2.jpg"
          alt="Smart Food Analyzer Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Smart Food Analyzer
        </h1>
      </div>

      {/* Right Section - Navigation Links */}
      <nav className="flex space-x-6 text-gray-800 font-medium items-center">
        <Link to="/home" className="hover:text-white hidden md:inline">
          Home
        </Link>
        <Link to="/aboutUs" className="hover:text-white">
          About Us
        </Link>
        <Link to="/contactUs" className="hover:text-white">
          Contact Us
        </Link>

        {!user ? (
          <>
            <Link to="/signin" className="hover:text-white">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-white">
              Log In
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;