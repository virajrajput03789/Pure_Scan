import { useEffect, useState } from "react";
import { auth } from "./FireBase";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// ⭐ Background neon blobs exactly like home.jsx
const NeonBlob = ({ color, top, left, size }) => (
  <motion.div
    initial={{ opacity: 0.5, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1.1 }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration: 6,
    }}
    style={{
      top,
      left,
      width: size,
      height: size,
      background: color,
    }}
    className="absolute blur-3xl rounded-full opacity-40"
  />
);

// ⭐ Floating particles (same theme)
const Particle = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.6, y: -20 }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3,
      delay,
    }}
    className="absolute w-2 h-2 rounded-full bg-green-400 blur-sm"
  />
);

function Profile() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleNameUpdate = async () => {
    if (newName.trim() === "") return;
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      await auth.currentUser.reload();
      setUser(auth.currentUser);
      toast.success("Name updated!");
      setNewName("");
    } catch (error) {
      toast.error("Failed to update name");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <p className="p-4 text-center text-gray-600">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10">

      {/* ⭐ SAME HOME.JSX BACKGROUND */}

      {/* Neon Blobs */}
      <NeonBlob color="#22c55e55" top="10%" left="-10%" size="300px" />
      <NeonBlob color="#4ade8055" top="60%" left="70%" size="250px" />
      <NeonBlob color="#86efac55" top="30%" left="40%" size="350px" />

      {/* Hologram Grid */}
      <div className="absolute inset-0 
        bg-[linear-gradient(90deg,transparent_95%,rgba(34,197,94,0.2)_100%),linear-gradient(0deg,transparent_95%,rgba(34,197,94,0.2)_100%)]
        bg-[size:50px_50px] opacity-30 animate-pulse"
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <Particle key={i} delay={i * 0.3} />
      ))}

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md mx-auto"
      >
        {/* Title */}
        <div className="relative w-fit mx-auto mb-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-green-600 drop-shadow-lg tracking-wide"
          >
            Your Profile
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-green-500 w-full rounded origin-left shadow-lg"
          />
        </div>

        {/* ⭐ GLASS CARD 3D TILT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ rotateX: 6, rotateY: -6 }}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 
                     shadow-2xl hover:shadow-green-400/40 relative overflow-hidden"
        >
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-700 
                          opacity-30 blur-2xl rounded-2xl" />

          <div className="relative z-10 text-green-900 space-y-3 font-medium">
            {user.photoURL && (
              <motion.img
                src={user.photoURL}
                alt="Profile"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                className="w-28 h-28 rounded-full mx-auto shadow-xl ring-4 ring-green-400/30"
              />
            )}

            <p><strong>Name:</strong> {user.displayName || "No name set"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </div>
        </motion.div>

        {/* Input + Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 space-y-3"
        >
          <motion.input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new display name"
            className="w-full px-4 py-2 rounded-xl bg-white/40 border border-green-400 text-green-900 
                       focus:ring-2 focus:ring-green-600 outline-none backdrop-blur-md"
            whileFocus={{ scale: 1.03 }}
          />

          {/* Liquid Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNameUpdate}
            className="relative overflow-hidden bg-green-600 text-white font-bold px-5 py-2 
                       rounded-xl shadow-lg"
          >
            <motion.span
              className="absolute inset-0 bg-green-400 opacity-30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
            Update Name
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;

