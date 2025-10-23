import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { db, auth } from "./FireBase";
import { collection, addDoc } from 'firebase/firestore';
import { NutritionScore } from "./NutritionScore";

const Scan = () => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [nutrients, setNutrients] = useState(null);
  const [productName, setProductName] = useState('');
  const [score, setScore] = useState(null);

  const getNutrientExplanation = (nutrients) => {
    const explain = [];

    if (nutrients?.proteins >= 5) {
      explain.push("🍗 High protein helps build muscle and keeps you full.");
    } else {
      explain.push("🍗 Low protein — not very filling or muscle-supportive.");
    }

    if (nutrients?.fiber >= 3) {
      explain.push("🌾 Good fiber supports digestion and slows sugar absorption.");
    } else {
      explain.push("🌾 Low fiber — may not support digestion well.");
    }

    if (nutrients?.['energy-kj'] >= 1000) {
      explain.push("🔋 High energy — calorie-dense product.");
    } else {
      explain.push("🔋 Low energy — not too calorie-heavy.");
    }

    if (nutrients?.sugars >= 10) {
      explain.push("🍬 High sugar — may lead to weight gain or diabetes.");
    } else {
      explain.push("🍬 Moderate sugar — relatively safe.");
    }

    if (nutrients?.['saturated-fat'] >= 5) {
      explain.push("🧈 High saturated fat may raise cholesterol.");
    } else {
      explain.push("🧈 Low saturated fat — heart-friendly.");
    }

    if (nutrients?.sodium >= 500) {
      explain.push("🧂 High sodium — may affect blood pressure.");
    } else {
      explain.push("🧂 Low sodium — good for heart health.");
    }

    return explain;
  };

  useEffect(() => {
    const fetchAndSave = async () => {
      const user = auth.currentUser;
      if (!user || data === 'Not Found' || saved) return;

      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
        const json = await res.json();

        if (!json.product || !json.product.nutriments) {
          alert(`❌ Product not available for barcode: ${data}`);
          setSaved(true);
          setImage(null);
          setNutrients(null);
          setProductName('Product not found');
          setScore(null);
          return;
        }

        const nutrientsData = json.product.nutriments || {};
        const imageUrl = json.product.image_url || null;
        const name = json.product.product_name || 'Unknown Product';

        const scoreValue = NutritionScore({
          energy: nutrientsData['energy-kj'] || 0,
          sugars: nutrientsData['sugars'] || 0,
          saturatedFat: nutrientsData['saturated-fat'] || 0,
          sodium: nutrientsData['sodium'] || 0,
          fiber: nutrientsData['fiber'] || 0,
          protein: nutrientsData['proteins'] || 0,
        });

        setImage(imageUrl);
        setNutrients(nutrientsData);
        setProductName(name);
        setScore(scoreValue);

        await addDoc(collection(db, 'scanHistory'), {
          uid: user.uid,
          productName: name,
          barcode: data,
          nutritionScore: scoreValue,
          image: imageUrl,
          timestamp: new Date(),
        });

        setSaved(true);
        console.log('✅ Saved:', name, scoreValue);
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

        {!saved ? (
          <div className="w-full max-w-md border rounded-md overflow-hidden shadow-md">
            <BarcodeScannerComponent
              width={500}
              height={300}
              onUpdate={(err, result) => {
                if (result) {
                  setData(result.text);
                  setSaved(false);
                }
              }}
            />
          </div>
        ) : (
          <div className="mt-6 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-5 text-left">
            <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
              🛒 {productName}
            </h2>

            {image && (
              <img
                src={image}
                alt="Product"
                className="w-40 h-40 object-contain mx-auto rounded border border-gray-300 shadow-sm mb-4"
              />
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
              <div>🍗 <strong>Protein:</strong> {nutrients?.proteins || 0} g</div>
              <div>🌾 <strong>Fiber:</strong> {nutrients?.fiber || 0} g</div>
              <div>🔋 <strong>Energy:</strong> {nutrients?.['energy-kj'] || 0} kJ</div>
              <div>🍬 <strong>Sugars:</strong> {nutrients?.sugars || 0} g</div>
              <div>🧈 <strong>Sat. Fat:</strong> {nutrients?.['saturated-fat'] || 0} g</div>
              <div>🧂 <strong>Sodium:</strong> {nutrients?.sodium || 0} mg</div>
            </div>

            {score && (
              <>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-semibold text-white px-4 py-2 rounded-full bg-green-600">
                    🅰️ Nutrition Score: {score.grade} ({score.rawScore})
                  </span>
                  <button
                    onClick={() => {
                      setSaved(false);
                      setImage(null);
                      setNutrients(null);
                      setProductName('');
                      setScore(null);
                      setData('Not Found');
                    }}
                    className="text-sm text-green-700 underline hover:text-green-900 transition"
                  >
                    🔄 Scan Another
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-semibold mb-1">Score Breakdown:</p>
                  <ul className="space-y-1">
                    <li>🔴 Energy Impact: +{score.breakdown.energy}</li>
                    <li>🔴 Sugar Impact: +{score.breakdown.sugars}</li>
                    <li>🔴 Saturated Fat Impact: +{score.breakdown.saturatedFat}</li>
                    <li>🔴 Sodium Impact: +{score.breakdown.sodium}</li>
                    <li>🟢 Fiber Benefit: -{score.breakdown.fiber}</li>
                    <li>🟢 Protein Benefit: -{score.breakdown.protein}</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    This score is calculated from actual nutrient values. We don’t hide unhealthy results — your health deserves honesty.
                  </p>

                  <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <p className="font-semibold mb-1">🧠 What this score means:</p>
                    {getNutrientExplanation(nutrients).length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {getNutrientExplanation(nutrients).map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-red-600">
                        ⚠️ No nutrient data available to explain this product. Please check the packaging or try another scan.
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 italic">
                      This product received a <strong>{score.grade}</strong> based on available data. If values are missing, the score may not reflect full accuracy.
                    </p>
                  </div>
                </div>
                           </>
            )}
          </div>
        )}

        <p className="mt-6 text-lg font-semibold text-green-700">
          Scanned Code: <span className="text-gray-900">{data}</span>
        </p>
      </main>
    </div>
  );
};

export default Scan;