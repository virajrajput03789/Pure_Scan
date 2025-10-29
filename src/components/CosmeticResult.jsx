import React from "react";

const CosmeticResult = ({ data }) => {
  if (!data) return null;

  const hasFlags = data.flagged && data.flagged.length > 0;

  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      {/* Product Name */}
      <h3 className="text-2xl font-bold text-green-700 mb-2">{data.name}</h3>

      {/* Health Score */}
      <p className="text-lg mb-2">
        <span className="font-semibold">Health Score:</span>{" "}
        <span
          className={`font-bold ${
            data.score >= 80
              ? "text-green-600"
              : data.score >= 50
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {data.score}/100
        </span>
      </p>

      {/* Flagged Ingredients */}
      {hasFlags && (
        <p className="text-red-600 font-medium mb-4">
          ⚠️ Use with caution: {data.flagged.join(", ")}
        </p>
      )}

      {/* Skin Type + Usage */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Suitable for:</span>{" "}
          {data.skinType?.join(", ") || "All skin types"}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          <span className="font-medium">How to use:</span>{" "}
          {data.usage || "Use as directed"}
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <p className="font-semibold text-green-700 mb-1">Benefits:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {data.benefits?.length > 0 ? (
            data.benefits.map((b, i) => <li key={i}>{b}</li>)
          ) : (
            <li>No specific benefits listed</li>
          )}
        </ul>
      </div>

      {/* Side Effects */}
      <div className="mb-4">
        <p className="font-semibold text-red-600 mb-1">Side Effects:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {data.sideEffects?.length > 0 ? (
            data.sideEffects.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li>No known side effects</li>
          )}
        </ul>
      </div>

      {/* Honest Recommendation */}
      <div className="mt-6 bg-gray-50 p-4 rounded text-sm text-gray-700">
        <p>
          <span className="font-semibold">Honest Recommendation:</span>{" "}
          {hasFlags
            ? "This product contains ingredients that may irritate sensitive skin. Consider alternatives if you experience discomfort."
            : "This product appears safe and suitable for regular use. Always patch test before full application."}
        </p>
      </div>
    </div>
  );
};

export default CosmeticResult;