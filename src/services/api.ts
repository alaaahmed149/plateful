// Import the types
import { Meal, MealAPIResponse, ProcessedMeal, Ingredient } from "@/types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getAllRecipes = async (): Promise<ProcessedMeal[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=`);
    const data: MealAPIResponse = await response.json();

    if (data.meals) {
      return data.meals.map(processMeal);
    }

    return [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const data: MealAPIResponse = await response.json();
    return data.meals ? data.meals.map((meal) => meal.strCategory) : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const searchRecipes = async (
  query: string
): Promise<ProcessedMeal[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data: MealAPIResponse = await response.json();
    return data.meals ? data.meals.map(processMeal) : [];
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
};

export const getRecipeById = async (
  id: string
): Promise<ProcessedMeal | null> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data: MealAPIResponse = await response.json();
    return data.meals && data.meals[0] ? processMeal(data.meals[0]) : null;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};

const processMeal = (meal: Meal): ProcessedMeal => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure: measure || "" });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(",") : [],
    youtubeUrl: meal.strYoutube,
    ingredients,
    sourceUrl: meal.strSource,
  };
};
