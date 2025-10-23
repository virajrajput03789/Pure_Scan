// src/utils/NutritionScore.js

export const NutritionScore = (nutrients) => {
  const {
    energy = 0,
    sugars = 0,
    saturatedFat = 0,
    sodium = 0,
    fiber = 0,
    protein = 0,
  } = nutrients;

  // 🔴 Negative Points
  const energyPoints = getEnergyPoints(energy);
  const sugarPoints = getSugarPoints(sugars);
  const satFatPoints = getSaturatedFatPoints(saturatedFat);
  const sodiumPoints = getSodiumPoints(sodium);

  // 🟢 Positive Points
  const fiberPoints = getFiberPoints(fiber);
  const proteinPoints = getProteinPoints(protein);

  // 🧮 Final Score Calculation
  const score =
    energyPoints +
    sugarPoints +
    satFatPoints +
    sodiumPoints -
    fiberPoints -
    proteinPoints;

  // 🏅 Grade Mapping
  let grade = "E";
  if (score <= 0) grade = "A";
  else if (score <= 2) grade = "B";
  else if (score <= 10) grade = "C";
  else if (score <= 18) grade = "D";

  // ✅ Return full breakdown for UI/dashboard
  return {
    grade,
    rawScore: score,
    breakdown: {
      energy: energyPoints,
      sugars: sugarPoints,
      saturatedFat: satFatPoints,
      sodium: sodiumPoints,
      fiber: fiberPoints,
      protein: proteinPoints,
    },
  };
};

// 🔴 Energy Points
function getEnergyPoints(val = 0) {
  val = Math.round(val);
  if (val > 3350) return 10;
  if (val > 3015) return 9;
  if (val > 2680) return 8;
  if (val > 2345) return 7;
  if (val > 2010) return 6;
  if (val > 1675) return 5;
  if (val > 1340) return 4;
  if (val > 1005) return 3;
  if (val > 670) return 2;
  if (val > 335) return 1;
  return 0;
}

// 🔴 Sugar Points
function getSugarPoints(val = 0) {
  val = Math.round(val);
  if (val > 45) return 10;
  if (val > 40) return 9;
  if (val > 36) return 8;
  if (val > 31) return 7;
  if (val > 27) return 6;
  if (val > 22.5) return 5;
  if (val > 18) return 4;
  if (val > 13.5) return 3;
  if (val > 9) return 2;
  if (val > 4.5) return 1;
  return 0;
}

// 🔴 Saturated Fat Points
function getSaturatedFatPoints(val = 0) {
  val = Math.round(val);
  if (val > 10) return 10;
  if (val > 9) return 9;
  if (val > 8) return 8;
  if (val > 7) return 7;
  if (val > 6) return 6;
  if (val > 5) return 5;
  if (val > 4) return 4;
  if (val > 3) return 3;
  if (val > 2) return 2;
  if (val > 1) return 1;
  return 0;
}

// 🔴 Sodium Points
function getSodiumPoints(val = 0) {
  val = Math.round(val);
  if (val > 900) return 10;
  if (val > 810) return 9;
  if (val > 720) return 8;
  if (val > 630) return 7;
  if (val > 540) return 6;
  if (val > 450) return 5;
  if (val > 360) return 4;
  if (val > 270) return 3;
  if (val > 180) return 2;
  if (val > 90) return 1;
  return 0;
}

// 🟢 Fiber Points
function getFiberPoints(val = 0) {
  val = Math.round(val);
  if (val > 4.7) return 5;
  if (val > 3.7) return 4;
  if (val > 2.8) return 3;
  if (val > 1.9) return 2;
  if (val > 0.9) return 1;
  return 0;
}

// 🟢 Protein Points
function getProteinPoints(val = 0) {
  val = Math.round(val);
  if (val > 8.0) return 5;
  if (val > 6.4) return 4;
  if (val > 4.8) return 3;
  if (val > 3.2) return 2;
  if (val > 1.6) return 1;
  return 0;
}