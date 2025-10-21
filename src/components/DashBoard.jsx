import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "./FireBase";

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

  // ✅ Analytics logic
  const totalScans = history.length;
  const scores = history.map(item => item.nutritionScore || 0);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const best = history.reduce((a, b) => (a.nutritionScore > b.nutritionScore ? a : b), history[0]);
  const worst = history.reduce((a, b) => (a.nutritionScore < b.nutritionScore ? a : b), history[0]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Your Scan History</h2>

      {/* ✅ Analytics Summary */}
      {history.length > 0 && (
        <div className="mb-6 text-sm text-gray-700 space-y-1">
          <p><strong>Total Scans:</strong> {totalScans}</p>
          <p><strong>Average Nutrition Score:</strong> {avgScore}</p>
          <p><strong>Best Product:</strong> {best?.productName} ({best?.nutritionScore})</p>
          <p><strong>Worst Product:</strong> {worst?.productName} ({worst?.nutritionScore})</p>
        </div>
      )}

      {history.length === 0 ? (
        <p className="text-gray-600">No scans yet. Start scanning to see results here!</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{item.productName}</p>
                  <p className="text-sm text-gray-500">Barcode: {item.barcode}</p>
                  <p className="text-sm text-gray-500">Nutrition Score: {item.nutritionScore}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;