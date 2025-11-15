import React, { useState, useEffect } from 'react';
import { db, auth } from './FireBase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeIngredients } from '../utils/analyzeIngredients';
import Scanner from '../components/Scanner';
import CosmeticResult from './CosmeticResult';

const CosmeticScan = () => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);
  const [result, setResult] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);

  const handleScan = (barcode) => {
    setData(barcode);
    setSaved(false);
    setProductNotFound(false);
    setResult(null);
  };

  const handleReset = () => {
    setSaved(false);
    setResult(null);
    setData('Not Found');
    setProductNotFound(false);
  };

  useEffect(() => {
    const fetchAndSaveCosmetic = async () => {
      const user = auth.currentUser;
      if (!user || !data || saved || data === 'Not Found') return;

      try {
        const res = await fetch(`https://world.openbeautyfacts.org/api/v2/product/${data}.json`);
        const responseData = await res.json();

        if (!responseData || !responseData.product) {
          setProductNotFound(true);
          setSaved(true);
          return;
        }

        const product = responseData.product;
        const ingredients = product.ingredients
          ? product.ingredients.map((i) => i.text).filter((ing) => ing && ing.length > 0)
          : [];

        const analysis = ingredients.length > 0
          ? analyzeIngredients(ingredients)
          : { analysis: [], score: 0, grade: "E", breakdown: {} };

        const productInfo = {
          name: product.product_name || "Unnamed Product",
          brand: product.brands || "Unknown Brand",
          image: product.image_front_url || product.image_url || product.image_front_small_url || null,
          ingredients,
          ...analysis,
          usage: product.usage || "Use as directed",
          skinType: ["normal", "oily"],
          sideEffects: [],
        };

        setResult(productInfo);

        const docRef = doc(db, 'cosmeticScans', `${user.uid}_${data}`);
        await setDoc(docRef, {
          barcode: data,
          productName: productInfo.name,
          brand: productInfo.brand,
          imageUrl: productInfo.image,
          ingredients,
          score: productInfo.score,
          grade: productInfo.grade,
          breakdown: productInfo.breakdown,
          analysis: productInfo.analysis,
          scannedAt: serverTimestamp(),
        });

        await addDoc(collection(db, 'cosmeticScanHistory'), {
          uid: user.uid,
          productName: productInfo.name,
          barcode: data,
          image: productInfo.image,
          score: productInfo.score,
          grade: productInfo.grade,
          timestamp: new Date(),
        });

        setSaved(true);
      } catch (err) {
        console.error("❌ Cosmetic fetch error:", err);
        setProductNotFound(true);
        setSaved(true);
      }
    };

    fetchAndSaveCosmetic();
  }, [data, saved]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <main className="flex-grow flex flex-col items-center px-6 py-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-pink-600">💄 Cosmetic Product Scanner</h1>
          <p className="text-sm text-gray-600 mt-1">
            Scan a cosmetic barcode to reveal honest ingredient analysis.
          </p>
        </div>

        {productNotFound && (
          <div className="w-full max-w-lg bg-red-50 border-l-4 border-red-400 text-red-800 rounded-xl p-6 shadow">
            <p className="font-semibold text-lg">⚠️ Product Not Found</p>
            <p className="text-sm mt-2">
              This product is not available in our database. Try scanning another item.
            </p>
          </div>
        )}

        {!productNotFound && !saved && (
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-5 border border-gray-200">
            <Scanner onScan={handleScan} borderColor="pink" />
          </div>
        )}

        {!productNotFound && saved && result && (
          <CosmeticResult data={result} onReset={handleReset} />
        )}

        <p className="mt-6 text-md font-semibold text-pink-700">
          Scanned Code: <span className="text-gray-900">{data}</span>
        </p>
      </main>
    </div>
  );
};

export default CosmeticScan;