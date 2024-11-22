import axios from 'axios';

// Define types for input parameters and responses
interface NutrientGoals {
    protein?: number;
    carbs?: number;
    fat?: number;
}

interface Meal {
    id: number;
    title: string;
    nutrition: {
        nutrients: { name: string; amount: number }[];
    };
    score?: number;
    ingredients?: string[];
}

interface MealPlan {
    day: number;
    meals: Meal[];
}

interface FetchRecommendationsParams {
    diet?: string;
    cuisines: string[];
    allergies: string[];
    mealType?: string;
    nutrientGoals?: NutrientGoals;
}

interface GenerateMealPlanParams {
    calories: number;
    diet?: string;
    cuisines: string[];
    allergies: string[];
    duration: number;
    efficiency?: 'reuse' | 'unique';
}

const API_KEY = "686a1b5c7f6143159b2ce375bc16c6d7"

// Fetch meal recommendations based on user preferences
export const fetchRecommendations = async ({
    diet,
    cuisines,
    allergies,
    mealType,
    nutrientGoals,
}: FetchRecommendationsParams): Promise<Meal[]> => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: API_KEY,
                number: 30,
                diet,
                intolerances: allergies.join(','),
                cuisine: cuisines.join(','),
                type: mealType,
                addRecipeNutrition: true,
            },
        });

        const scoredMeals = response.data.results.map((meal: Meal) => ({
            ...meal,
            score: calculateMealScore(meal, nutrientGoals),
        }));

        return scoredMeals.sort((a:any, b:any) => (b.score || 0) - (a.score || 0)).slice(0, 10);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
};

// Calculate meal score based on user preferences and nutrient goals
const calculateMealScore = (meal: Meal, nutrientGoals?: NutrientGoals): number => {
    let score = 0;

    if (nutrientGoals) {
        const nutrients = meal.nutrition?.nutrients || [];
        const nutrientMap = nutrients.reduce<Record<string, number>>((acc, nutrient) => {
            acc[nutrient.name.toLowerCase()] = nutrient.amount;
            return acc;
        }, {});

        if (nutrientGoals.protein && nutrientMap.protein >= nutrientGoals.protein) score += 5;
        if (nutrientGoals.carbs && nutrientMap.carbohydrates <= nutrientGoals.carbs) score += 5;
        if (nutrientGoals.fat && nutrientMap.fat <= nutrientGoals.fat) score += 5;
    }

    return score;
};

// Generate a dynamic meal plan based on duration and efficiency
export const generateMealPlan = async ({
    calories,
    diet,
    cuisines,
    allergies,
    duration,
    efficiency,
}: GenerateMealPlanParams): Promise<MealPlan[]> => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: API_KEY,
                number: 50,
                diet,
                intolerances: allergies.join(','),
                cuisine: cuisines.join(','),
                addRecipeNutrition: true,
            },
        });

        const meals: Meal[] = response.data.results;

        const plan: MealPlan[] = [];
        const caloriePerDay = calories / duration;

        for (let day = 0; day < duration; day++) {
            const dailyMeals = generateDailyPlan(meals, caloriePerDay, efficiency);
            plan.push({ day: day + 1, meals: dailyMeals });
        }

        return plan;
    } catch (error) {
        console.error('Error generating meal plan:', error);
        return [];
    }
};

// Generate a daily plan based on calorie distribution and efficiency
const generateDailyPlan = (
    meals: Meal[],
    calorieTarget: number,
    efficiency?: 'reuse' | 'unique'
): Meal[] => {
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    const dailyPlan: Meal[] = [];

    for (const mealType of mealTypes) {
        const suitableMeals = meals.filter((meal) => {
            const calories =
                meal.nutrition?.nutrients.find((n) => n.name === 'Calories')?.amount || 0;
            return calories <= calorieTarget / 3; // Split calories roughly across meal types
        });

        if (efficiency === 'reuse') {
            // Optimize for ingredient reusability
            suitableMeals.sort((a, b) => commonIngredients(a, b));
        }

        if (suitableMeals.length > 0) {
            dailyPlan.push(suitableMeals[0]); // Select the best match
        }
    }

    return dailyPlan;
};

// Calculate common ingredients between meals
const commonIngredients = (mealA: Meal, mealB: Meal): number => {
    const ingredientsA = mealA.ingredients || [];
    const ingredientsB = mealB.ingredients || [];
    return ingredientsA.filter((ingredient) => ingredientsB.includes(ingredient)).length;
};
