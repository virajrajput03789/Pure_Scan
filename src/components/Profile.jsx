import { useEffect, useState } from "react";
import { auth } from "./FireBase";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleNameUpdate = async () => {
    if (newName.trim() === "") return;
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      await auth.currentUser.reload(); // ✅ Refresh user info from Firebase
      const updatedUser = auth.currentUser;
      setUser(updatedUser);
      toast.success("Name updated!");
      setNewName("");
    } catch (error) {
      toast.error("Failed to update name");
      console.error(error);
    }
  };

  if (!user) {
    return <p className="p-4 text-center text-gray-600">Please log in to view your profile.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto px-6 pt-6 pb-12" // ✅ updated padding for tighter top
    >
      <div className="relative w-fit mx-auto mb-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xl md:text-2xl font-bold text-green-700 text-center animate-pulse"
        >
          Your Profile
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="h-1 bg-green-500 w-full mt-1 rounded origin-left"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white shadow-md rounded p-4 space-y-4 text-sm md:text-base"
      >
        {user.photoURL && (
          <motion.img
            src={user.photoURL}
            alt="Profile"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <p><strong>Name:</strong> {user.displayName || "No name set"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
      </motion.div>

      {/* ✅ Display Name Update Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 space-y-2"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new display name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNameUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
        >
          Update Name
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Profile;