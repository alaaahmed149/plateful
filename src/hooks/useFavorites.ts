"use client";
import { useState, useEffect } from "react";
import { ProcessedMeal } from "@/types";

const FAVORITES_KEY = "plateful-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<ProcessedMeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFavoritesToStorage = (newFavorites: ProcessedMeal[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  };

  const addToFavorites = (recipe: ProcessedMeal) => {
    if (!isFavorite(recipe.id)) {
      const newFavorites = [...favorites, recipe];
      setFavorites(newFavorites);
      saveFavoritesToStorage(newFavorites);
    }
  };

  const removeFromFavorites = (recipeId: string) => {
    const newFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(newFavorites);
    saveFavoritesToStorage(newFavorites);
  };

  const toggleFavorite = (recipe: ProcessedMeal) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some((recipe) => recipe.id === recipeId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    saveFavoritesToStorage([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    isLoading,
    favoritesCount: favorites.length,
  };
}
