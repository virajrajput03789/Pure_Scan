import { useEffect, useState } from "react";
import { auth, db } from "./FireBase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";

// ✅ GlowingCard with fog aura
const GlowingCard = ({ children, glowColor = "#22c55e", className = "" }) => (
  <div
    className={`relative rounded-xl p-[2px] overflow-hidden ${className}`}
    style={{
      background: `linear-gradient(135deg, ${glowColor}55, transparent)`,
      boxShadow: `0 0 12px ${glowColor}`,
      borderRadius: "1rem",
    }}
  >
    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none z-0 transition duration-300 hover:opacity-100 opacity-0" />
    <div className="relative z-10 rounded-xl bg-white/90 backdrop-blur">{children}</div>
  </div>
);

function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "scanHistory"), {
        uid: user.uid,
        productName: "Nivea Sun protect and moisture",
        barcode: "4005808430208",
        nutritionScore: { value: 72, grade: "B" },
        image:
          "https://images.openbeautyfacts.org/images/products/400/580/843/0208/front_en.14.200.jpg",
        type: "cosmetic",
        timestamp: serverTimestamp(),
      });

      const q = query(
        collection(db, "scanHistory"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        const scan = { id: doc.id, ...doc.data() };

        if (!scan.type) {
          const name = scan.productName?.toLowerCase() || "";
          if (
            name.includes("cream") ||
            name.includes("lotion") ||
            name.includes("shampoo") ||
            name.includes("face") ||
            name.includes("nivea") ||
            name.includes("moisturizer")
          ) {
            scan.type = "cosmetic";
          } else {
            scan.type = "food";
          }
        }

        return scan;
      });

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
      setScans((prev) => prev.filter((scan) => scan.id !== scanId));
      console.log("🗑️ Deleted scan:", scanId);
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  if (loading)
    return (
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
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-4"
        >
          {scans.map((scan, index) => (
            <GlowingCard
              glowColor={
                scan.type === "cosmetic"
                  ? "#ec4899"
                  : scan.type === "food"
                  ? "#22c55e"
                  : "#9ca3af"
              }
              key={index}
            >
              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", bounce: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl text-sm md:text-base transition-all duration-300 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">{scan.productName}</h3>
                  <span className={`relative px-2 py-1 rounded text-white text-xs font-semibold z-10 ${
                    scan.type === "cosmetic" ? "bg-pink-500" :
                    scan.type === "food" ? "bg-green-500" : "bg-gray-400"
                  }`}>
                    {scan.type || "unknown"}
                    <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Barcode:</strong> {scan.barcode}</p>
                  {scan.nutritionScore && (
                    <p>
                      <strong>Nutrition Score:</strong>{" "}
                      <span className="relative inline-block">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs md:text-sm font-bold z-10 relative ${
                            scan.nutritionScore?.value >= 80
                              ? "bg-green-500"
                              : scan.nutritionScore?.value >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {scan.nutritionScore?.value} ({scan.nutritionScore?.grade})
                        </span>
                        <span
                          className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                      </span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    <strong>Scanned At:</strong>{" "}
                    {scan.timestamp?.seconds
                      ? new Date(scan.timestamp.seconds * 1000).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>

                {scan.image && (
                  <motion.img
                    src={scan.image}
                    alt={scan.productName}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-24 mt-2 rounded shadow-sm ring-2 ring-transparent hover:ring-green-400"
                  />
                )}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(scan.id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden"
                >
                  Delete
                  <span className="absolute inset-0 bg-red-700/10 animate-ping rounded pointer-events-none" />
                </motion.button>
              </motion.li>
            </GlowingCard>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

export default ScanHistory;