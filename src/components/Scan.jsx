import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { db, auth } from "./FireBase";
import { collection, addDoc } from 'firebase/firestore';
import { calculateNutritionScore } from './NutritionScore';

const Scan = () => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchAndSave = async () => {
      const user = auth.currentUser;
      if (!user || data === 'Not Found' || saved) return;

      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
        const json = await res.json();

        if (!json.product) {
          console.warn('❌ Product not found in API');
          return;
        }

        const nutrients = json.product.nutriments || {};
        const score = calculateNutritionScore({
          energy: nutrients['energy-kj'] || 0,
          sugars: nutrients['sugars'] || 0,
          saturatedFat: nutrients['saturated-fat'] || 0,
          sodium: nutrients['sodium'] || 0,
          fiber: nutrients['fiber'] || 0,
          protein: nutrients['proteins'] || 0,
        });

        await addDoc(collection(db, 'scanHistory'), {
          uid: user.uid,
          productName: json.product.product_name || 'Unknown Product',
          barcode: data,
          nutritionScore: score,
          timestamp: new Date(),
        });

        setSaved(true);
        console.log('✅ Saved:', json.product.product_name, score);
      } catch (err) {
        console.error('❌ Error:', err);
      }
    };

    fetchAndSave();
  }, [data, saved]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Scan a Product</h1>
        <p className="text-gray-600 mb-6">
          Point your camera at a barcode to scan and analyze the product.
        </p>

        <div className="w-full max-w-md border rounded-md overflow-hidden shadow-md">
          <BarcodeScannerComponent
            width={500}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
                setSaved(false); // reset for next scan
              }
            }}
          />
        </div>

        <p className="mt-6 text-lg font-semibold text-green-700">
          Scanned Code: <span className="text-gray-900">{data}</span>
        </p>
      </main>
    </div>
  );
};

export default Scan;