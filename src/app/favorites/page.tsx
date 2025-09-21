"use client";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ChefHat } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { favorites, isLoading, clearAllFavorites, favoritesCount } =
    useFavorites();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-4 text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3 fill-current" />
              My Favorites
            </h1>
            <p className="text-gray-600 mt-2">
              {favoritesCount === 0
                ? "No favorite recipes yet"
                : `${favoritesCount} favorite ${
                    favoritesCount === 1 ? "recipe" : "recipes"
                  }`}
            </p>
          </div>

          {favoritesCount > 0 && (
            <button
              onClick={clearAllFavorites}
              className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </button>
          )}
        </div>

        {favoritesCount === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No Favorites Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring recipes and add your favorites by clicking the
              heart icon on any recipe!
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="relative w-72 bg-white rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <div className="relative">
                    <Image
                      src={recipe.thumbnail}
                      alt={recipe.name}
                      width={288}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <FavoriteButton
                      recipe={recipe}
                      variant="overlay"
                      size="md"
                    />

                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {recipe.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {recipe.name}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="font-medium">{recipe.area}</span>
                      <span className="mx-2">•</span>
                      <span>{recipe.ingredients.length} ingredients</span>
                    </div>

                    {recipe.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-highlight-100 text-highlight-800 rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                        {recipe.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            +{recipe.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
