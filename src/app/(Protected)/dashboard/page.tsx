"use client";

import useSWR from "swr";
import fetcher from "../../../api/fetchers";
import RecipeCard from "../../../components/RecipieCard";
import { useState, useEffect } from "react";

interface RecipeProps {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: string;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, error, isLoading } = useSWR(
    debouncedSearch
      ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(debouncedSearch)}`
      : "https://dummyjson.com/recipes",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return (
    <div className="min-h-screen   lg:p-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10 ">
          <h1 className="text-3xl lg:text-5xl py-1 font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent">
            Recipe Collection
          </h1>
          <div className="px-6 w-full sm:w-64">
            <div className=" relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-400 transition-all duration-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-indigo-100/50 dark:bg-slate-800/50 rounded-2xl h-96"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm">
            <div className="text-amber-500 dark:text-gold-400 text-xl font-medium mb-4">
              Failed to load recipes
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  lg:gap-8">
            {data?.recipes?.map((recipe: RecipeProps) => (
              <div key={recipe.id}>
                  <RecipeCard  recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}