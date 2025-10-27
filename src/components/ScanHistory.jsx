import { useEffect, useState } from "react";
import { auth, db } from "./FireBase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";

function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "scanHistory"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScans(data);
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const handleDelete = async (scanId) => {
    const confirm = window.confirm("Are you sure you want to delete this scan?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "scanHistory", scanId));
      setScans(prev => prev.filter(scan => scan.id !== scanId));
      console.log("🗑️ Deleted scan:", scanId);
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  if (loading) return (
    <div className="p-4 max-w-screen-md mx-auto space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-300 rounded"></div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-screen-md mx-auto"
    >
      <div className="relative w-fit mx-auto mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-center text-green-700">
          Your Scan History
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="h-1 bg-green-500 w-full mt-1 rounded origin-left"
        />
      </div>

      {scans.length === 0 ? (
        <div className="text-center text-gray-500">
          <img src="/empty-box.svg" alt="No scans" className="w-32 mx-auto mb-2" />
          <p>No scans found. Try scanning a product!</p>
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="space-y-4"
        >
          {scans.map((scan, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="border p-4 rounded shadow bg-white text-sm md:text-base"
            >
              <p><strong>Product:</strong> {scan.productName}</p>
              <p><strong>Barcode:</strong> {scan.barcode}</p>
              <p>
                <strong>Nutrition Score:</strong>{" "}
                <span className={`animate-pulse px-2 py-1 rounded text-white text-xs md:text-sm ${
                  scan.nutritionScore?.value >= 80 ? "bg-green-500" :
                  scan.nutritionScore?.value >= 50 ? "bg-yellow-500" :
                  "bg-red-500"
                }`}>
                  {scan.nutritionScore?.value} ({scan.nutritionScore?.grade})
                </span>
              </p>
              <p>
                <strong>Scanned At:</strong>{" "}
                {scan.timestamp?.seconds
                  ? new Date(scan.timestamp.seconds * 1000).toLocaleString()
                  : "Unknown"}
              </p>
              {scan.image && (
                <motion.img
                  src={scan.image}
                  alt={scan.productName}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 mt-2 rounded"
                />
              )}
              <button
                onClick={() => handleDelete(scan.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

export default ScanHistory;