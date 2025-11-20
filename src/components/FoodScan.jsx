import React, { useState, useEffect } from 'react';
import { db, auth } from "./FireBase";
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NutritionScore } from "./NutritionScore";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { isFoodBarcode } from '../utils/barcodeValidator';
import Scanner from '../components/Scanner';
import FoodResultCard from "./FoodResultCard";

const FoodScan = ({ scanType }) => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [nutrients, setNutrients] = useState(null);
  const [productName, setProductName] = useState('');
  const [score, setScore] = useState(null);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [warning, setWarning] = useState('');
  const location = useLocation();

  const generateExplanations = (nutrients, breakdown) => {
    const out = [];
    if (!nutrients || typeof nutrients !== 'object') return ['⚠️ Nutrient data not available.'];
    // ... rest of nutrient explanation logic (same as FoodResultCard example)
    return out;
  };

  useEffect(() => {
    const fetchAndSave = async () => {
      if (scanType === "cosmetic") return;

      const user = auth.currentUser;
      if (!user || data === 'Not Found' || saved) return;

      if (!isFoodBarcode(data)) {
        setWarning("⚠️ This barcode does not belong to a food product.");
        return;
      }

      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
        const json = await res.json();
        if (!json.product || !json.product.nutriments) {
          setProductNotFound(true);
          setSaved(true);
          setImage(null);
          setNutrients(null);
          setProductName(null);
          setScore(null);
          return;
        }

        const nutriments = json.product.nutriments;
        const nutrientsData = {
          calories: nutriments['energy-kcal'] || nutriments.energy_kcal || 0,
          energy: nutriments['energy-kj'] || 0,
          sugars: nutriments.sugars || 0,
          saturatedFat: nutriments['saturated-fat'] || 0,
          sodium: nutriments.sodium || 0,
          fiber: nutriments.fiber || 0,
          protein: nutriments.proteins || 0,
        };

        const isEmptyNutrient = Object.values(nutrientsData).every(val => val === 0 || val === null);
        if (isEmptyNutrient) {
          setIsIncomplete(true);
          setSaved(true);
          return;
        }

        const scoreResult = NutritionScore(nutrientsData);
        setImage(json.product.image_url || null);
        setProductName(json.product.product_name || 'Unknown Product');
        setScore(scoreResult);

        const docRef = doc(db, 'scans', `${user.uid}_${data}`);
        await setDoc(docRef, {
          barcode: data,
          productName: json.product.product_name || 'Unnamed Product',
          imageUrl: json.product.image_url || null,
          nutrients: nutrientsData,
          score: scoreResult,
          isIncomplete: isEmptyNutrient,
          scannedAt: serverTimestamp(),
        });

        await addDoc(collection(db, 'scanHistory'), {
          uid: user.uid,
          productName: json.product.product_name || 'Unknown Product',
          barcode: data,
          nutritionScore: scoreResult,
          image: json.product.image_url || null,
          timestamp: new Date(),
        });

        setSaved(true);
        setNutrients(nutrientsData);
      } catch (err) {
        console.error('❌ Error:', err);
      }
    };

    fetchAndSave();
  }, [data, saved, scanType]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Scan a Product</h1>
        <p className="text-gray-600 mb-6">
          Point your camera at a barcode to scan and analyze the product.
        </p>

        {warning && (
          <div className="mt-6 w-full max-w-md bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg shadow-md p-5 text-left">
            {warning}
          </div>
        )}

        {!saved ? (
          <div className="w-full max-w-md border rounded-md overflow-hidden shadow-md">
            <Scanner onScan={(barcode) => { setData(barcode); setSaved(false); }} borderColor="green" />
          </div>
        ) : productNotFound ? (
          <div className="mt-6 w-full max-w-md bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-md p-5 text-left">
            <p className="font-semibold">⚠️ Product not available.</p>
            <button onClick={() => { setSaved(false); setData('Not Found'); setProductNotFound(false); }} className="mt-4 text-sm text-green-700 underline hover:text-green-900 transition">🔄 Scan Another</button>
          </div>
        ) : isIncomplete ? (
          <div className="mt-6 w-full max-w-md bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg shadow-md p-5 text-left">
            ⚠️ Nutrient data not available. This product received a score based on available data.
            <br /> Scanned Code: <strong>{data}</strong>
            <button onClick={() => { setSaved(false); setData('Not Found'); setIsIncomplete(false); }} className="mt-4 text-sm text-green-700 underline hover:text-green-900 transition">🔄 Scan Another</button>
          </div>
        ) : (
          <FoodResultCard
            score={score}
            image={image}
            productName={productName}
            nutrients={nutrients}
            generateExplanations={generateExplanations}
            onReset={() => { setSaved(false); setData('Not Found'); setImage(null); setNutrients(null); setProductName(''); setScore(null); }}
          />
        )}

        <p className="mt-6 text-lg font-semibold text-green-700">
          Scanned Code: <span className="text-gray-900">{data}</span>
        </p>
      </main>
    </div>
  );
};

export default FoodScan;
