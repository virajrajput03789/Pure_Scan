import { useEffect, useState } from "react";
import { auth, db } from "./FireBase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

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
    <div className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-green-700">
        Your Scan History
      </h2>
      {scans.length === 0 ? (
        <div className="text-center text-gray-500">
          <img src="/empty-box.svg" alt="No scans" className="w-32 mx-auto mb-2" />
          <p>No scans found. Try scanning a product!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {scans.map((scan, index) => (
            <li key={index} className="border p-4 rounded shadow bg-white text-sm md:text-base">
              <p><strong>Product:</strong> {scan.productName}</p>
              <p><strong>Barcode:</strong> {scan.barcode}</p>
              <p>
                <strong>Nutrition Score:</strong>{" "}
                <span className={`px-2 py-1 rounded text-white text-xs md:text-sm ${
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
                <img src={scan.image} alt={scan.productName} className="w-24 mt-2 rounded" />
              )}
              <button
                   onClick={() => handleDelete(scan.id)}
                   className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"> Delete
              </button>
            </li>
            
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScanHistory;