import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FireBase';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.message);
      alert(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-center min-h-screen px-4"
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200 backdrop-blur-md bg-white/80 relative overflow-hidden"
      >
        {/* ✅ Gradient Heading + Green Underline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2 mb-8"
        >
          <motion.h2
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 12px rgba(34,197,94,0.8)"
            }}
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 tracking-wide animate-pulse"
          >
            Create an Account
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="h-1 bg-green-500 w-24 mx-auto rounded origin-left"
          />
        </motion.div>

        {/* ✅ Form */}
        <form className="space-y-6" onSubmit={handleSignup}>
          {[
            { value: name, set: setName, type: 'text', placeholder: 'Full Name' },
            { value: email, set: setEmail, type: 'email', placeholder: 'Email' },
            { value: password, set: setPassword, type: 'password', placeholder: 'Password' }
          ].map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="relative transition duration-300"
            >
              <motion.input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/90 backdrop-blur-sm transition-all duration-300"
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#059669",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-green-600 text-white py-2.5 rounded-md font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        {/* ✅ Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="text-sm text-center text-gray-600 mt-6"
        >
          Already have an account?{' '}
          <motion.span whileHover={{ x: 2 }} className="inline-block">
            <Link to="/login" className="text-green-700 font-medium hover:underline">
              Log in
            </Link>
          </motion.span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;