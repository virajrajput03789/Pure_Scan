import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-green-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo2.jpg"
            alt="Smart Food Analyzer Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="text-xl md:text-2xl font-bold text-white">
            PureScan
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center items-center gap-3 text-white font-medium">
          <Link to="/home" className="hover:text-gray-100 transition">Home</Link>
          <Link to="/aboutUs" className="hover:text-gray-100 transition">About Us</Link>
          <Link to="/contactUs" className="hover:text-gray-100 transition">Contact Us</Link>

          {user ? (
            <>
              <Link to="/history" className="hover:text-gray-100 transition">History</Link>
              <Link to="/profile" className="hover:text-gray-100 transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-gray-100 transition">Sign Up</Link>
              <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition">Log In</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;