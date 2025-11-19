import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "./FireBase";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "scanHistory"),
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(data);
    });

    return () => unsubscribe();
  }, []);

  const totalScans = history.length;
  const scores = history.map(item => item.nutritionScore || 0);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const best = history.reduce((a, b) => (a.nutritionScore > b.nutritionScore ? a : b), history[0]);
  const worst = history.reduce((a, b) => (a.nutritionScore < b.nutritionScore ? a : b), history[0]);

  const getScoreColor = (score) => {
    if (score <= 0) return "text-green-600";
    if (score <= 5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center px-4"
    >
      <main className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-4xl w-full mt-10 z-10 space-y-8 text-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-green-700"
        >
          📊 Your Scan History
        </motion.h2>

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-700 space-y-2 bg-white/90 p-4 rounded shadow"
          >
            <p><strong>Total Scans:</strong> {totalScans}</p>
            <p><strong>Average Nutrition Score:</strong> <span className={getScoreColor(avgScore)}>{avgScore}</span></p>
            <p><strong>Best Product:</strong> {best?.productName} (<span className={getScoreColor(best?.nutritionScore)}>{best?.nutritionScore}</span>)</p>
            <p><strong>Worst Product:</strong> {worst?.productName} (<span className={getScoreColor(worst?.nutritionScore)}>{worst?.nutritionScore}</span>)</p>
          </motion.div>
        )}

        {history.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-center mt-12"
          >
            No scans yet. Start scanning to see results here!
          </motion.p>
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
            {history.map((item) => (
              <motion.li
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="border p-4 rounded shadow-sm bg-white/90 flex gap-4 items-center"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.productName}</p>
                  <p className="text-sm text-gray-500">Barcode: {item.barcode}</p>
                  <p className={`text-sm ${getScoreColor(item.nutritionScore)}`}>
                    Nutrition Score: {item.nutritionScore}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </main>
    </motion.div>
  );
};

export default Dashboard;