// src/utils/NutritionScore.js


export const NutritionScore = (nutrients) => {
  const {
    calories = 0,
    sugars = 0,
    saturatedFat = 0,
    sodium = 0, // in grams
    fiber = 0,
    protein = 0,
  } = nutrients;

  const allZero =
  calories === 0 &&
  sugars === 0 &&
  saturatedFat === 0 &&
  sodium === 0 &&
  fiber === 0 &&
  protein === 0;

if (allZero) {
  return {
    value: 0,
    grade: "E",
    breakdown: {
      calories: 0,
      sugars: 0,
      saturatedFat: 0,
      sodium: 0,
      fiber: 0,
      protein: 0,
      penalty: 0,
      warning: "No nutrient data available",
    },
  };
}

  // 🔁 Convert sodium from grams to mg
  const sodiumMg = Math.max(0, Math.round(sodium * 1000));

  // 🔴 Negative Points
  const caloriePoints = Math.max(0, getCaloriePoints(calories));
  const sugarPoints = Math.max(0, getSugarPoints(sugars));
  const satFatPoints = Math.max(0, getSaturatedFatPoints(saturatedFat));
  const sodiumPoints = Math.max(0, getSodiumPoints(sodiumMg));

  // 🟢 Positive Points
  const fiberPoints = Math.max(0, getFiberPoints(fiber));
  const proteinPoints = Math.max(0, getProteinPoints(protein));

  // 🧮 Raw Score
  const rawScore =
    caloriePoints +
    sugarPoints +
    satFatPoints +
    sodiumPoints -
    fiberPoints -
    proteinPoints;

  const score = Math.max(0, rawScore); // ✅ Never negative

  // 🚨 Red Flag Penalties
  let penalty = 0;
  if (sodiumMg > 800) penalty += 10;
  if (saturatedFat > 6) penalty += 10;
  if (sugars > 20) penalty += 10;
  if (calories > 600) penalty += 10;

  penalty = Math.max(0, penalty); // ✅ Safety

  // 🎯 Final Value Calculation
  const baseValue = Math.max(0, 100 - score * 4);
  const finalValue = Math.max(0, baseValue - penalty); // ✅ Never negative

  // 🏅 Grade Mapping (Stricter)
  let grade = "E";
  if (finalValue >= 90) grade = "A";
  else if (finalValue >= 75) grade = "B";
  else if (finalValue >= 50) grade = "C";
  else if (finalValue >= 25) grade = "D";

  return {
    value: finalValue,
    grade,
    breakdown: {
      calories: caloriePoints,
      sugars: sugarPoints,
      saturatedFat: satFatPoints,
      sodium: sodiumPoints,
      fiber: fiberPoints,
      protein: proteinPoints,
      penalty,
    },
  };
};

// 🔴 Calorie Points
function getCaloriePoints(val = 0) {
  val = Math.round(val);
  if (val > 800) return 10;
  if (val > 700) return 9;
  if (val > 600) return 8;
  if (val > 500) return 7;
  if (val > 400) return 6;
  if (val > 300) return 5;
  if (val > 200) return 4;
  if (val > 150) return 3;
  if (val > 100) return 2;
  if (val > 50) return 1;
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

// 🔴 Sodium Points (in mg)
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