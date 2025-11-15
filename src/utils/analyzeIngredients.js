export const analyzeIngredients = (ingredients) => {
  const vitaminMap = {
    niacinamide: "Vitamin B3",
    ascorbic_acid: "Vitamin C",
    tocopherol: "Vitamin E",
    panthenol: "Vitamin B5",
    retinol: "Vitamin A",
    biotin: "Vitamin B7",
  };

  const flaggedList = [
    "alcohol",
    "fragrance",
    "paraben",
    "sulfate",
    "silicone",
    "mineral_oil",
    "formaldehyde",
  ];

  const benefitMap = {
    salicylic_acid: "Acne control",
    hyaluronic_acid: "Hydration",
    glycolic_acid: "Exfoliation",
    niacinamide: "Brightening",
    aloe_vera: "Soothing",
    tea_tree_oil: "Antibacterial",
    zinc: "Oil control",
    ceramide: "Barrier repair",
  };

  const vitamins = [];
  const flagged = [];
  const benefits = [];
  const analysis = [];
  const unknown = [];

  ingredients.forEach((rawIng) => {
    const key = rawIng.toLowerCase().replace(/[^a-z0-9_]/gi, "_").replace(/_+/g, "_");

    if (vitaminMap[key] && !vitamins.includes(vitaminMap[key])) {
      vitamins.push(vitaminMap[key]);
      analysis.push(`✅ Contains ${vitaminMap[key]} — good for skin (${rawIng}).`);
    }

    if (flaggedList.includes(key) && !flagged.includes(rawIng)) {
      flagged.push(rawIng);
      analysis.push(`⚠️ Warning: ${rawIng} may irritate or harm sensitive skin.`);
    }

    if (benefitMap[key] && !benefits.includes(benefitMap[key])) {
      benefits.push(benefitMap[key]);
      analysis.push(`💡 Benefit detected: ${benefitMap[key]} from ${rawIng}.`);
    }

    if (!vitaminMap[key] && !flaggedList.includes(key) && !benefitMap[key]) {
      unknown.push(rawIng);
    }
  });

  if (unknown.length > 0) {
    const unknownList = unknown.slice(0, 25).join(", ");
    analysis.push(`ℹ️ Some ingredients have limited research: ${unknownList}... We prefer honesty over guesses.`);
  }

  // ✅ Loyalty-Driven Score Logic
  const flaggedPenalty = flagged.length * 10;
  const vitaminBoost = vitamins.length * 8;
  const benefitBoost = benefits.length * 5;
  const unknownPenalty = Math.min(unknown.length * 2, 15);

  const rawScore = 100 - flaggedPenalty - unknownPenalty + vitaminBoost + benefitBoost;
  const finalScore = Math.max(0, Math.min(100, rawScore));

  let grade = "E";
  if (finalScore >= 90) grade = "A";
  else if (finalScore >= 75) grade = "B";
  else if (finalScore >= 50) grade = "C";
  else if (finalScore >= 25) grade = "D";

  const breakdown = {
    flagged: flagged.length,
    vitamins: vitamins.length,
    benefits: benefits.length,
    unknown: unknown.length,
    penalty: flaggedPenalty + unknownPenalty,
    boost: vitaminBoost + benefitBoost,
  };

  return {
    vitamins,
    flagged,
    benefits,
    unknown,
    analysis,
    score: finalScore,
    grade,
    breakdown,
  };
};