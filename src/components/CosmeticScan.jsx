import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { db, auth } from './FireBase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeIngredients } from '../utils/analyzeCosmetic';
import { motion } from 'framer-motion';

const CosmeticScan = () => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [result, setResult] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    const fetchAndSaveCosmetic = async () => {
      const user = auth.currentUser;
      if (!user || !data || saved || data === 'Not Found') return;

      try {
        const res = await fetch(`https://world.openbeautyfacts.org/api/v2/product/${data}.json`);
        const json = await res.json();
        const product = json.product;

        if (!product || !product.ingredients_text) {
          setProductNotFound(true);
          setSaved(true);
          return;
        }

        const ingredients = product.ingredients_text
          .split(/[,;]/)
          .map((ing) => ing.trim())
          .filter((ing) => ing.length > 0);

        const analysis = analyzeIngredients(ingredients);

        const productInfo = {
          name: product.product_name || "Unnamed Product",
          brand: product.brands || "Unknown Brand",
          ingredients,
          usage: "Use as directed on packaging.",
          skinType: ["all"],
          benefits: ["Basic skincare"],
          sideEffects: [],
          ...analysis,
        };

        setResult(productInfo);
        setImage(product.image_url || null);
        setProductName(product.product_name || "Unnamed Product");

        const docRef = doc(db, 'cosmeticScans', `${user.uid}_${data}`);
        await setDoc(docRef, {
          barcode: data,
          productName: product.product_name || "Unnamed Product",
          brand: product.brands || "Unknown Brand",
          imageUrl: product.image_url || null,
          ingredients,
          analysis,
          scannedAt: serverTimestamp(),
        });

        await addDoc(collection(db, 'cosmeticScanHistory'), {
          uid: user.uid,
          productName: product.product_name || "Unnamed Product",
          barcode: data,
          image: product.image_url || null,
          timestamp: new Date(),
        });

        setSaved(true);
        console.log("✅ Cosmetic saved:", product.product_name);
      } catch (err) {
        console.error("❌ Cosmetic fetch error:", err);
        setProductNotFound(true);
        setSaved(true);
      }
    };

    fetchAndSaveCosmetic();
  }, [data, saved]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Scan a Cosmetic Product</h1>
        <p className="text-gray-600 mb-6">
          Point your camera at a barcode to scan and analyze the product.
        </p>

        {productNotFound && (
          <div className="mt-6 w-full max-w-md bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-md p-5 text-left">
            <p className="font-semibold">⚠️ Product not available.</p>
            <p className="text-sm mt-2">
              This barcode could not be found in our database. Please try scanning another item.
            </p>
            <button
              onClick={() => {
                setSaved(false);
                setImage(null);
                setProductName('');
                setResult(null);
                setData('Not Found');
                setProductNotFound(false);
              }}
              className="mt-4 text-sm text-pink-700 underline hover:text-pink-900 transition"
            >
              🔄 Scan Another
            </button>
          </div>
        )}

        {!productNotFound && !saved && (
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
        )}

        {!productNotFound && saved && result && (
          <div className="mt-6 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-5 text-left">
            <h2 className="text-2xl font-bold text-pink-600 mb-3 flex items-center gap-2">
              💄 {productName}
            </h2>

            {image && (
              <img
                src={image}
                alt="Product"
                className="w-40 h-40 object-contain mx-auto rounded border border-gray-300 shadow-sm mb-4"
              />
            )}

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold mb-1">🧪 Ingredients:</p>
              <ul className="list-disc list-inside space-y-1">
                {result?.ingredients?.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold mb-1">🧠 Ingredient Analysis:</p>
              {result?.analysis?.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {result.analysis.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-600">
                  ⚠️ No analysis available for this product.
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setSaved(false);
                setImage(null);
                setProductName('');
                setResult(null);
                setData('Not Found');
              }}
              className="mt-6 text-sm text-pink-700 underline hover:text-pink-900 transition"
            >
              🔄 Scan Another
            </button>
          </div>
        )}

        <p className="mt-6 text-lg font-semibold text-pink-700">
          Scanned Code: <span className="text-gray-900">{data}</span>
        </p>
      </main>
    </div>
  );
};

export default CosmeticScan;