import { useEffect, useState } from "react";
import { auth } from "../firebase"; // ✅ Make sure this path is correct
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

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
      toast.success("Name updated!");

      // ✅ Force refresh user info
      const updatedUser = auth.currentUser;
      setUser({ ...updatedUser });

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
    <div key={user.uid} className="max-w-md mx-auto p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700 text-center">Your Profile</h2>
      <div className="bg-white shadow-md rounded p-4 space-y-4 text-sm md:text-base">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <p><strong>Name:</strong> {user.displayName || "No name set"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
      </div>

      {/* ✅ Display Name Update Form */}
      <div className="mt-6 space-y-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new display name"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleNameUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Name
        </button>
      </div>
    </div>
  );
}

export default Profile;