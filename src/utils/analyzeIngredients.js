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
    "mineral oil",
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

  ingredients.forEach((ing) => {
    const key = ing.toLowerCase().replace(/\s+/g, "_");

    if (vitaminMap[key] && !vitamins.includes(vitaminMap[key])) {
      vitamins.push(vitaminMap[key]);
      analysis.push(`✅ Contains ${vitaminMap[key]} (${ing})`);
    }

    if (flaggedList.includes(key) && !flagged.includes(ing)) {
      flagged.push(ing);
      analysis.push(`⚠️ Flagged ingredient: ${ing}`);
    }

    if (benefitMap[key] && !benefits.includes(benefitMap[key])) {
      benefits.push(benefitMap[key]);
      analysis.push(`💡 Benefit: ${benefitMap[key]} from ${ing}`);
    }
  });

  return { vitamins, flagged, benefits, analysis };
};