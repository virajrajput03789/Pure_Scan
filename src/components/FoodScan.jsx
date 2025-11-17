import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { db, auth } from "./FireBase";
import { collection, addDoc } from 'firebase/firestore';
import { NutritionScore } from "./NutritionScore";
import { FaLeaf, FaSeedling, FaBreadSlice, FaGlassWhiskey } from 'react-icons/fa';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { isFoodBarcode } from '../utils/barcodeValidator';
import Scanner from '../components/Scanner';
import FoodResultCard from "./FoodResultCard";




function InfoRow({ label, value }) {
  return (
    <div className="bg-green-100 text-green-800 p-2 rounded shadow-sm flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}


const NutriScoreBadges = ({ grade }) => {
  const map = {
    A: 'bg-green-800 text-white',
    B: 'bg-green-400 text-black',
    C: 'bg-yellow-300 text-black',
    D: 'bg-orange-400 text-white',
    E: 'bg-red-500 text-white',
  };

  const order = ['A', 'B', 'C', 'D', 'E'];
  return (
    <div className="flex justify-center gap-2 mb-4">
      {order.map((g) => (
        <span
          key={g}
          className={`px-3 py-1 rounded font-bold text-sm ${g === grade ? map[g] : 'bg-gray-100 text-gray-500'}`}
          aria-label={`Nutri-score ${g}`}
        >
          {g}
        </span>
      ))}
    </div>
  );
};

const ImpactRow = ({ label, value, max = 20, positive = false }) => {
  const abs = Math.abs(Number(value) || 0);
  const pct = Math.min(100, Math.round((abs / max) * 100));
  const barColor = positive ? 'bg-green-500' : 'bg-red-500';
  const sign = '+';
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className={`font-semibold ${positive ? 'text-green-700' : 'text-red-700'}`}>
          {positive ? `${sign}${abs}` : `${sign}${abs}`}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
        <div className={`${barColor} h-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const FoodScan = ({ scanType }) => {
  const [data, setData] = useState('Not Found');
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [nutrients, setNutrients] = useState(null);
  const [productName, setProductName] = useState('');
  const [score, setScore] = useState(null);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const scanType = params.get('type'); // 'food' or 'cosmetics'
  const [warning, setWarning] = useState('');
  
  


// place near other helpers in Scan.jsx


const isEmptyNutrientData = (nutrients) => {
  if (!nutrients || typeof nutrients !== 'object') return true;
  const keysToCheck = ['calories', 'sugars', 'saturatedFat', 'sodium', 'fiber', 'protein'];
  return keysToCheck.every((key) => {
    const val = Number(nutrients[key] || 0);
    return val === 0 || isNaN(val);
  });
};

const generateExplanations = (nutrients, breakdown) => {
  const out = [];

  // ✅ Defensive check to avoid crash
  if (!nutrients || typeof nutrients !== 'object') {
    return ['⚠️ Nutrient data not available.'];
  }

  // 🔥 Calories
const calories = Number(nutrients.calories || 0);
if (calories >= 400) {
  out.push('🔥 Calories — high amount, may lead to weight gain if eaten often.');
} else if (calories >= 150) {
  out.push('🔥 Calories — moderate amount, consider portion size.');
} else if (calories > 0) {
  out.push('🔥 Calories — low amount, suitable for light snacking.');
} else if (breakdown?.calories && breakdown.calories !== 0) {
  out.push('🔥 Calories — impact detected in score breakdown.');
} else {
  out.push('🔥 Calories — data not available.');
}

  // 🥬 Protein
  const protein = Number(nutrients.proteins || 0);
  if (protein >= 5) {
    out.push('🥬 Protein — helps build and repair muscles; keeps you full.');
  } else if (protein > 0) {
    out.push('🥬 Protein — low amount, may not keep you full for long.');
  } else if (breakdown?.protein && breakdown.protein !== 0) {
    out.push('🥬 Protein — benefit detected in score breakdown.');
  } else {
    out.push('🥬 Protein — data not available.');
  }

  // 🌾 Fiber
  const fiber = Number(nutrients.fiber || 0);
  if (fiber >= 3) {
    out.push('🌾 Fiber — supports digestion and slows sugar entering the blood.');
  } else if (fiber > 0) {
    out.push('🌾 Fiber — low amount; may not help digestion much.');
  } else if (breakdown?.fiber && breakdown.fiber !== 0) {
    out.push('🌾 Fiber — benefit detected in score breakdown.');
  } else {
    out.push('🌾 Fiber — data not available.');
  }

  // 🔥 Energy
  const energy = Number(nutrients['energy-kj'] || 0);
  if (energy >= 1000) {
    out.push('🔥 Energy — calorie-dense; watch portion size.');
  } else if (energy > 0) {
    out.push('🔥 Energy — not very calorie-heavy.');
  } else if (breakdown?.energy && breakdown.energy !== 0) {
    out.push('🔥 Energy — impact detected in score breakdown.');
  } else {
    out.push('🔥 Energy — data not available.');
  }

  // 🍯 Sugars
  const sugars = Number(nutrients.sugars || 0);
  if (sugars >= 10) {
    out.push('🍯 Sugar — high amount; can cause weight gain if eaten often.');
  } else if (sugars > 0) {
    out.push('🍯 Sugar — moderate or low amount.');
  } else if (breakdown?.sugars && breakdown.sugars !== 0) {
    out.push('🍯 Sugar — impact detected in score breakdown.');
  } else {
    out.push('🍯 Sugar — data not available.');
  }

  // 🥥 Saturated Fat
  const sat = Number(nutrients['saturated-fat'] || 0);
  if (sat >= 5) {
    out.push('🥥 Saturated fat — high amount; may raise cholesterol.');
  } else if (sat > 0) {
    out.push('🥥 Saturated fat — low amount; better for heart health.');
  } else if (breakdown?.saturatedFat && breakdown.saturatedFat !== 0) {
    out.push('🥥 Saturated fat — impact detected in score breakdown.');
  } else {
    out.push('🥥 Saturated fat — data not available.');
  }

  // 🧂 Sodium
  const sodium = Number(nutrients.sodium || 0);
  if (sodium >= 500) {
    out.push('🧂 Sodium — high amount; can raise blood pressure.');
  } else if (sodium > 0) {
    out.push('🧂 Sodium — low amount; better for blood pressure.');
  } else if (breakdown?.sodium && breakdown.sodium !== 0) {
    out.push('🧂 Sodium — impact detected in score breakdown.');
  } else {
    out.push('🧂 Sodium — data not available.');
  }

  return out;
};

 useEffect(() => {
  const fetchAndSave = async () => {
    if (scanType === "cosmetic") return; // ✅ cosmetic barcode ko food API se rokne wali line

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

      const nutrients = {
        calories: nutriments['energy-kcal'] || nutriments.energy_kcal || 0,
        energy: nutriments['energy-kj'] || 0,
        sugars: nutriments.sugars || 0,
        saturatedFat: nutriments['saturated-fat'] || 0,
        sodium: nutriments.sodium || 0,
        fiber: nutriments.fiber || 0,
        protein: nutriments.proteins || 0,
      };

      const isEmptyNutrient = Object.values(nutrients).every(val => val === 0 || val === null);
      if (isEmptyNutrient) {
        setIsIncomplete(true);
        setSaved(true);
        setImage(null);
        setNutrients(null);
        setProductName('');
        setScore(null);
        return;
      }

      const scoreResult = NutritionScore(nutrients);
      setImage(json.product.image_url || null);
      setProductName(json.product.product_name || 'Unknown Product');
      setScore(scoreResult);

      const docRef = doc(db, 'scans', `${user.uid}_${data}`);
      await setDoc(docRef, {
        barcode: data,
        productName: json.product.product_name || 'Unnamed Product',
        imageUrl: json.product.image_url || null,
        nutrients,
        score: scoreResult,
        isIncomplete: isEmptyNutrient,
        scannedAt: serverTimestamp(),
      });

      setImage(json.product.image_url || null);
      setNutrients(nutrients);
      setProductName(json.product.product_name || 'Unnamed Product');
      setScore(scoreResult);
      setSaved(true);

      const nutrientsData = json.product.nutriments || {};
      const imageUrl = json.product.image_url || null;
      const name = json.product.product_name || 'Unknown Product';

      await addDoc(collection(db, 'scanHistory'), {
        uid: user.uid,
        productName: name,
        barcode: data,
        nutritionScore: scoreResult,
        image: imageUrl,
        timestamp: new Date(),
      });

      setSaved(true);
      console.log('✅ Saved:', name, scoreResult);
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

      {warning && (
        <div className="mt-6 w-full max-w-md bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg shadow-md p-5 text-left">
          {warning}
        </div>
      )}

      {productNotFound ? (
        <div className="mt-6 w-full max-w-md bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-md p-5 text-left">
          <p className="font-semibold">⚠️ Product not available.</p>
          <p className="text-sm mt-2">
            This barcode could not be found in our database. Please try scanning another item.
          </p>
          <button
            onClick={() => {
              setSaved(false);
              setImage(null);
              setNutrients(null);
              setProductName('');
              setScore(null);
              setData('Not Found');
              setProductNotFound(false);
            }}
            className="mt-4 text-sm text-green-700 underline hover:text-green-900 transition"
          >
            🔄 Scan Another
          </button>
        </div>
      ) : isIncomplete ? (
        <div className="mt-6 w-full max-w-md bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg shadow-md p-5 text-left">
          ⚠️ Nutrient data not available. This product received a score based on available data.
          <br />
          Scanned Code: <strong>{data}</strong>
          <br />
          <button
            onClick={() => {
              setSaved(false);
              setImage(null);
              setNutrients(null);
              setProductName('');
              setScore(null);
              setData('Not Found');
              setIsIncomplete(false);
            }}
            className="mt-4 text-sm text-green-700 underline hover:text-green-900 transition"
          >
            🔄 Scan Another
          </button>
        </div>
      ) : !saved ? (
        <div className="w-full max-w-md border rounded-md overflow-hidden shadow-md">
          <Scanner
            onScan={(barcode) => {
              setData(barcode);
              setSaved(false);
            }}
            borderColor="green"
          />
        </div>
      ) : (
        <FoodResultCard
          score={score}
          image={image}
          productName={productName}
          nutrients={nutrients}
          generateExplanations={generateExplanations}
          onReset={() => {
            setSaved(false);
            setImage(null);
            setNutrients(null);
            setProductName('');
            setScore(null);
            setData('Not Found');
          }}
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