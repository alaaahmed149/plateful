"use client";
import Image from "next/image";
import Link from "next/link";
import { useRecipe } from "@/hooks/useRecipes";
import {
  ArrowLeft,
  CookingPot,
  Globe,
  Tag,
  ExternalLink,
  Youtube,
} from "lucide-react";
import { useParams } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";

type Props = {
  id: string;
};

export default function Recipe() {
  const param = useParams<Props>();
  const { data: recipe, isLoading, isError, error } = useRecipe(param.id);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-4 text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center flex-col">
        <div className="text-center py-8">
          <p className="text-red-600 text-lg mb-2">Recipe not found</p>
          <p className="text-gray-600 text-sm mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Link
            href="/recipes"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="bg-white shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/recipes"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Link>
        </div>
      </div>

      <div className="relative lg:h-[500px] mb-8">
        <div className="hidden lg:block relative w-full h-full">
          <Image
            src={recipe.thumbnail}
            alt={recipe.name}
            fill
            className="object-cover rounded-b-3xl"
          />

          <div className="absolute inset-0 bg-black/40 rounded-b-3xl"></div>

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto px-8 pb-12 w-full">
              <div className="max-w-2xl">
                <div className="mb-4">
                  <span className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-full shadow-lg">
                    {recipe.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  {recipe.name}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center text-white/90">
                    <Globe className="w-5 h-5 mr-2 text-primary-300" />
                    <span className="font-medium">{recipe.area} Cuisine</span>
                  </div>

                  {recipe.tags.length > 0 && (
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-primary-300" />
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm bg-white/20 text-white rounded-full backdrop-blur-sm"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <FavoriteButton recipe={recipe} size="lg" />

                  {recipe.youtubeUrl && (
                    <a
                      href={recipe.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                    >
                      <Youtube className="w-5 h-5 mr-2" />
                      Watch Video
                    </a>
                  )}

                  {recipe.sourceUrl && (
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Original Recipe
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="relative">
              <Image
                src={recipe.thumbnail}
                alt={recipe.name}
                width={600}
                height={400}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-recipe"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full shadow-md">
                  {recipe.category}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 my-4">
                {recipe.name}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium">{recipe.area} Cuisine</span>
                </div>

                {recipe.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-primary-600" />
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-highlight-100 text-highlight-800 rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <FavoriteButton recipe={recipe} size="md" />

                {recipe.youtubeUrl && (
                  <a
                    href={recipe.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Watch Video
                  </a>
                )}

                {recipe.sourceUrl && (
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Original Recipe
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-bold text-sm">📝</span>
                </div>
                Ingredients
              </h2>

              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-medium text-primary-700">
                        {ingredient.measure}
                      </span>
                      <span className="text-gray-700 ml-2">
                        {ingredient.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-highlight-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-highlight-600 font-bold text-sm">
                    👨‍🍳
                  </span>
                </div>
                Instructions
              </h2>

              <div className="prose prose-lg max-w-none">
                {recipe.instructions
                  .split("\r\n")
                  .filter((step) => step.trim())
                  .map((step, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-start">
                        <span className="w-8 h-8 bg-highlight-600 text-white font-bold rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed m-0 pt-1">
                          {step.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-card p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recipe Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Globe className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Cuisine</p>
                <p className="text-gray-600">{recipe.area}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Tag className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Category</p>
                <p className="text-gray-600">{recipe.category}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <CookingPot className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Ingredients</p>
                <p className="text-gray-600">
                  {recipe.ingredients.length} items
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
