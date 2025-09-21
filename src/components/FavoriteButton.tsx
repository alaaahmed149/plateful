"use client";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ProcessedMeal } from "@/types";

interface FavoriteButtonProps {
  recipe: ProcessedMeal;
  variant?: "default" | "overlay";
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  recipe,
  variant = "default",
  size = "md",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isRecipeFavorited = isFavorite(recipe.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  const sizeClasses = {
    sm: "w-8 h-8 p-2",
    md: "w-10 h-10 p-2.5",
    lg: "w-12 h-12 p-2.5",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (variant === "overlay") {
    return (
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-3 right-3 ${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10 group`}
        aria-label={
          isRecipeFavorited ? "Remove from favorites" : "Add to favorites"
        }
      >
        <Heart
          className={`${iconSizes[size]} transition-all duration-200 ${
            isRecipeFavorited
              ? "fill-red-500 text-red-500"
              : "text-gray-600 group-hover:text-red-500"
          }`}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`${
        sizeClasses[size]
      } inline-flex items-center justify-center rounded-full transition-all duration-200 ${
        isRecipeFavorited
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500"
      }`}
      aria-label={
        isRecipeFavorited ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        className={`${iconSizes[size]} transition-all duration-200 ${
          isRecipeFavorited ? "fill-current" : ""
        }`}
      />
    </button>
  );
}
