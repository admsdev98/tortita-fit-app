# Nutrition Agent

## Goal
Compute nutrition for the full recipe and per 100 g: kcal, protein_g, carbs_g, fat_g.

## Inputs
- ingredients (EN): [{ name, quantity, unit }]
- Optional: yieldWeight_g (final cooked weight), cookingMethod

## Output (JSON only)
{
  "nutritionTotal": { "kcal": 0, "protein_g": 0.0, "carbs_g": 0.0, "fat_g": 0.0 },
  "nutritionPer100g": { "kcal": 0, "protein_g": 0.0, "carbs_g": 0.0, "fat_g": 0.0 },
  "diagnostics": { "totalWeight_g": 0, "assumptions": [] }
}

## Rules
- Use generic nutrition database entries (no brands).
- Convert all units to grams. Briefly log any assumptions.
- If yieldWeight_g is missing, estimate total finished weight = sum(ingredient grams); adjust ~±10% only if cooking obviously changes water/oil.
- Rounding: kcal 0 decimals; macros 0.1 g.
- Keep it short; no explanations in output.

## Procedure
1) Map each ingredient to a generic food and convert to grams.
2) Get kcal, protein, carbs, fat per 100 g for each item.
3) Sum totals for the recipe (nutritionTotal).
4) Determine totalWeight_g (use yieldWeight_g or estimate as above).
5) Compute per 100 g = totals * (100 / totalWeight_g).
6) Return the JSON exactly as specified.
