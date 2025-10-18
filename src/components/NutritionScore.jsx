// src/utils/calculateNutritionScore.js

export const calculateNutritionScore = (nutrients) => {
  let score = 0;

  // Negative points
  if (nutrients.energy > 3350) score += 10;
  else if (nutrients.energy > 3015) score += 9;
  else if (nutrients.energy > 2680) score += 8;
  else if (nutrients.energy > 2345) score += 7;
  else if (nutrients.energy > 2010) score += 6;
  else if (nutrients.energy > 1675) score += 5;
  else if (nutrients.energy > 1340) score += 4;
  else if (nutrients.energy > 1005) score += 3;
  else if (nutrients.energy > 670) score += 2;
  else if (nutrients.energy > 335) score += 1;

  if (nutrients.sugars > 45) score += 10;
  else if (nutrients.sugars > 40) score += 9;
  else if (nutrients.sugars > 36) score += 8;
  else if (nutrients.sugars > 31) score += 7;
  else if (nutrients.sugars > 27) score += 6;
  else if (nutrients.sugars > 22.5) score += 5;
  else if (nutrients.sugars > 18) score += 4;
  else if (nutrients.sugars > 13.5) score += 3;
  else if (nutrients.sugars > 9) score += 2;
  else if (nutrients.sugars > 4.5) score += 1;

  if (nutrients.saturatedFat > 10) score += 10;
  else if (nutrients.saturatedFat > 9) score += 9;
  else if (nutrients.saturatedFat > 8) score += 8;
  else if (nutrients.saturatedFat > 7) score += 7;
  else if (nutrients.saturatedFat > 6) score += 6;
  else if (nutrients.saturatedFat > 5) score += 5;
  else if (nutrients.saturatedFat > 4) score += 4;
  else if (nutrients.saturatedFat > 3) score += 3;
  else if (nutrients.saturatedFat > 2) score += 2;
  else if (nutrients.saturatedFat > 1) score += 1;

  if (nutrients.sodium > 900) score += 10;
  else if (nutrients.sodium > 810) score += 9;
  else if (nutrients.sodium > 720) score += 8;
  else if (nutrients.sodium > 630) score += 7;
  else if (nutrients.sodium > 540) score += 6;
  else if (nutrients.sodium > 450) score += 5;
  else if (nutrients.sodium > 360) score += 4;
  else if (nutrients.sodium > 270) score += 3;
  else if (nutrients.sodium > 180) score += 2;
  else if (nutrients.sodium > 90) score += 1;

  // Positive points
  if (nutrients.fiber > 4.7) score -= 5;
  else if (nutrients.fiber > 3.7) score -= 4;
  else if (nutrients.fiber > 2.8) score -= 3;
  else if (nutrients.fiber > 1.9) score -= 2;
  else if (nutrients.fiber > 0.9) score -= 1;

  if (nutrients.protein > 8.0) score -= 5;
  else if (nutrients.protein > 6.4) score -= 4;
  else if (nutrients.protein > 4.8) score -= 3;
  else if (nutrients.protein > 3.2) score -= 2;
  else if (nutrients.protein > 1.6) score -= 1;

  // Final grade
  if (score <= 0) return "A";
  if (score <= 2) return "B";
  if (score <= 10) return "C";
  if (score <= 18) return "D";
  return "E";
};