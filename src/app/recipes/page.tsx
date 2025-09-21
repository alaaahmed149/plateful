"use client";

import Image from "next/image";
import {
  useCategories,
  useRecipes,
  useRecipesByCategory,
  useSearchRecipes,
} from "@/hooks/useRecipes";
import CardsLoading from "@/components/CardsLoading";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: allRecipes,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
    refetch: refetchAll,
  } = useRecipes();

  const {
    data: filteredRecipes,
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
    error: errorFiltered,
    refetch: refetchFiltered,
  } = useRecipesByCategory(selectedCategory, !!selectedCategory);

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useSearchRecipes(debouncedSearchQuery, debouncedSearchQuery.length > 2);

  const { data: categories } = useCategories();

  const recipes =
    debouncedSearchQuery.length > 2
      ? searchResults
      : selectedCategory
      ? filteredRecipes
      : allRecipes;

  const isLoading =
    debouncedSearchQuery.length > 2
      ? isLoadingSearch
      : selectedCategory
      ? isLoadingFiltered
      : isLoadingAll;

  const isError =
    debouncedSearchQuery.length > 2
      ? isErrorSearch
      : selectedCategory
      ? isErrorFiltered
      : isErrorAll;

  const error =
    debouncedSearchQuery.length > 2
      ? errorSearch
      : selectedCategory
      ? errorFiltered
      : errorAll;

  const refetch =
    debouncedSearchQuery.length > 2
      ? refetchSearch
      : selectedCategory
      ? refetchFiltered
      : refetchAll;

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setSearchInput("");
    setDebouncedSearchQuery("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (event.target.value.length > 0) {
      setSelectedCategory("");
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setDebouncedSearchQuery("");
  };

  const clearAll = () => {
    setSelectedCategory("");
    setSearchInput("");
    setDebouncedSearchQuery("");
  };

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
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center px-4 md:px-8 lg:px-18 gap-4 md:gap-0">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-2 md:my-8">
          Recipes
          {debouncedSearchQuery && (
            <span className="block md:inline text-base md:text-lg font-normal text-primary-600 md:ml-2 mt-1 md:mt-0">
              • Search: &ldquo;{debouncedSearchQuery}&rdquo;
            </span>
          )}
          {selectedCategory && !debouncedSearchQuery && (
            <span className="block md:inline text-base md:text-lg font-normal text-primary-600 md:ml-2 mt-1 md:mt-0">
              • {selectedCategory}
            </span>
          )}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto mb-3">
          <div className="relative w-full sm:w-auto min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2.5 md:py-2.5 border border-gray-200 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <div className="p-2 md:p-3 flex items-center gap-2 rounded-xl bg-white shadow-xs w-full sm:w-auto min-w-[200px] border border-gray-200">
            <Filter className="text-primary w-4 h-4 flex-shrink-0" />
            <select
              name="categoryFilter"
              id="categoryFilter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border-none outline-none bg-transparent text-gray-700 w-full text-sm md:text-base"
              disabled={debouncedSearchQuery.length > 0}
            >
              <option value="">All Categories</option>
              {categories &&
                categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          {(selectedCategory || searchInput) && (
            <button
              onClick={clearAll}
              className="px-3 py-2 text-sm cursor-pointer bg-red-100 shadow-xs text-gray-700 rounded-lg hover:bg-red-200 transition-colors w-full sm:w-auto"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {recipes && recipes.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 px-2 mb-8 max-w-8xl">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative bg-white p-4 rounded-lg shadow-xs hover:shadow-md transition-shadow duration-300 ease-in-out w-90 border-1 border-gray-100 md:w-72 flex-shrink-0"
            >
              <Link href={`/recipes/${recipe.id}`}>
                <div className="relative">
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />

                  <FavoriteButton recipe={recipe} variant="overlay" size="sm" />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {recipe.name}
                </h2>
                <p className="text-sm text-gray-600">{recipe.area}</p>
                <p className="text-sm text-primary-600">{recipe.category}</p>

                {recipe.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-highlight text-primary-800 rounded-lg"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
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
