"use client";

import Image from "next/image";
import { useRecipes } from "@/hooks/useRecipes";
import CardsLoading from "@/components/CardsLoading";
import Link from "next/link";
export default function Recipes() {
  const { data: recipes, isLoading, isError, error, refetch } = useRecipes();

  if (isLoading) {
    return <CardsLoading />;
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center flex-col">
        <div className="text-center py-8">
          <p className="text-red-600 text-lg mb-2">Failed to load recipes</p>
          <p className="text-gray-600 text-sm">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center flex-col">
      <h1 className="text-4xl font-extrabold text-gray-900 my-8">
        Recipes ({recipes?.length || 0})
      </h1>

      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-8">
          {recipes.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="bg-white p-4 rounded-lg shadow-xs hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer"
            >
              <Image
                src={recipe.thumbnail}
                alt={recipe.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-600">{recipe.area}</p>
              <p className="text-sm text-primary-600">{recipe.category}</p>

              {recipe.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-highlight-100 text-highlight-800 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No recipes found</p>
          <p className="text-gray-500 text-sm mt-2">Try refreshing the page</p>
        </div>
      )}
    </div>
  );
}
