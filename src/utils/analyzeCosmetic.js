// List of known risky or controversial cosmetic ingredients
const knownHazards = [
  "paraben",           // Preservative, linked to hormone disruption
  "sulfate",           // Harsh cleanser, may irritate skin
  "bht",               // Synthetic antioxidant, potential endocrine disruptor
  "phthalate",         // Used in fragrance, linked to reproductive issues
  "alcohol",           // Can dry or irritate skin (depends on type)
  "fragrance",         // Common allergen, often undisclosed chemicals
  "formaldehyde",      // Preservative, known carcinogen
  "triclosan",         // Antibacterial, banned in some countries
  "oxybenzone",        // Sunscreen agent, linked to hormone disruption
  "talc",              // May be contaminated with asbestos
  "mineral oil",       // Can clog pores, petroleum-derived
  "silicone",          // May cause buildup, not biodegradable
  "petrolatum",        // Occlusive, may be contaminated
  "colorants",         // Artificial dyes, may cause irritation
  "synthetic polymers" // Environmental concern, microplastics
];

// Honest analysis function
export function analyzeIngredients(ingredients) {
  const flagged = ingredients.filter(ing =>
    knownHazards.some(hazard =>
      ing.toLowerCase().includes(hazard)
    )
  );

  const score = calculateScore(ingredients.length, flagged.length);

  return {
    flagged,
    score
  };
}

// Transparent scoring logic
function calculateScore(total, flaggedCount) {
  const ratio = flaggedCount / total;

  if (total === 0) return 0; // No ingredients = no trust

  if (ratio === 0) return 100;           // Fully clean
  if (ratio <= 0.2) return 80;           // Mostly safe
  if (ratio <= 0.5) return 50;           // Mixed safety
  if (ratio <= 0.8) return 30;           // High risk
  return 10;                             // Very risky
}