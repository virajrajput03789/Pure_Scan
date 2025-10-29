import React, { useState } from "react";
import { analyzeIngredients } from "../utils/analyzeCosmetic";
import CosmeticResult from "./CosmeticResult";
import { isCosmeticBarcode } from "../utils/barcodeValidator";


const CosmeticScan = () => {
  const [barcode, setBarcode] = useState("");
  const [result, setResult] = useState(null);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!barcode) return;

    setLoading(true);
    setResult(null);
    setWarning("");
    if (!isCosmeticBarcode(barcode)) {
  setWarning("⚠️ This barcode does not belong to a cosmetic product.");
  return;
}


    try {
      const response = await fetch(
        `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`
      );
      const data = await response.json();

      const product = data.product;

      if (!product || !product.ingredients_text) {
        setWarning(
          "⚠️ Product not found or missing ingredient data. Please check the barcode or try another product."
        );
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
        skinType: ["all"], // Placeholder
        benefits: ["Basic skincare"], // Placeholder
        sideEffects: [], // Placeholder
        ...analysis,
      };

      setResult(productInfo);
    } catch (error) {
      setWarning(
        "⚠️ Unable to fetch product data. Please check your internet connection or try a different barcode."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Scan Cosmetic Product</h2>

      <input
        type="text"
        placeholder="Enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />

      <button
        onClick={handleScan}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan"}
      </button>

      {warning && (
        <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
          {warning}
        </div>
      )}

      {result && <CosmeticResult data={result} />}
    </div>
  );
};

export default CosmeticScan;