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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Your Scan History</h2>
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