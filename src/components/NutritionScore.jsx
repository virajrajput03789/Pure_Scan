// src/utils/calculateNutritionScore.js

export const calculateNutritionScore = (nutrients) => {
  let score = 0;

  // 🔴 Negative Points
  score += getEnergyPoints(nutrients.energy);
  score += getSugarPoints(nutrients.sugars);
  score += getSaturatedFatPoints(nutrients.saturatedFat);
  score += getSodiumPoints(nutrients.sodium);

  // 🟢 Positive Points
  score -= getFiberPoints(nutrients.fiber);
  score -= getProteinPoints(nutrients.protein);

  // 🏅 Final Grade
  if (score <= 0) return "A";
  if (score <= 2) return "B";
  if (score <= 10) return "C";
  if (score <= 18) return "D";
  return "E";
};

// 🔴 Energy Points
function getEnergyPoints(val) {
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
function getSugarPoints(val) {
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
function getSaturatedFatPoints(val) {
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
function getSodiumPoints(val) {
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
function getFiberPoints(val) {
  if (val > 4.7) return 5;
  if (val > 3.7) return 4;
  if (val > 2.8) return 3;
  if (val > 1.9) return 2;
  if (val > 0.9) return 1;
  return 0;
}

// 🟢 Protein Points
function getProteinPoints(val) {
  if (val > 8.0) return 5;
  if (val > 6.4) return 4;
  if (val > 4.8) return 3;
  if (val > 3.2) return 2;
  if (val > 1.6) return 1;
  return 0;
}