"use client";

import { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipieCard';
import { RecipeProps } from '@/app/types/types';

export default function CategoriesPage() {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        setRecipes(data.recipes || []);
        
        // Extract unique categories from recipes
        const uniqueCategories = Array.from(new Set(
          data.recipes.flatMap((recipe: RecipeProps) => recipe.mealType)
        ));
        setCategories(['all', ...uniqueCategories as string[]]);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = selectedCategory === 'all'
    ? recipes
    : recipes.filter(recipe => recipe.mealType.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-[url('/culinary-pattern.svg')] dark:bg-slate-900 p-6 lg:p-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-5xl p-1 font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent mb-8 inline-block font-serif">
          Recipe Categories
        </h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 dark:border-amber-400"></div>
          </div>
        ) : (
          <>
            {/* Category Filter Buttons */}
            <div className="flex gap-3 mb-8  overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-500/80 dark:scrollbar-thumb-amber-400/80 hover:scrollbar-thumb-indigo-600 dark:hover:scrollbar-thumb-amber-300 scrollbar-track-slate-200/50 dark:scrollbar-track-slate-900/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full transition-all duration-300 ease-in-out">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${selectedCategory === category
                      ? 'bg-indigo-500 text-white dark:bg-amber-500'
                      : 'bg-white text-gray-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-amber-900/30'}
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No recipes found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}