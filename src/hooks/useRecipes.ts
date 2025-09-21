import { useQuery } from "@tanstack/react-query";
import {
  getAllRecipes,
  searchRecipes,
  getRecipeById,
  getAllCategories,
} from "@/services/api";
import { ProcessedMeal } from "@/types";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export const useSearchRecipes = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["recipes", "search", query],
    queryFn: () => searchRecipes(query),
    enabled: enabled && query.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useRecipe = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useRecipesByCategory = (
  category: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["recipes", "category", category],
    queryFn: async (): Promise<ProcessedMeal[]> => {
      const allRecipes = await getAllRecipes();
      return allRecipes.filter(
        (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
      );
    },
    enabled: enabled && !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
