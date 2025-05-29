"use client";

import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipieCard';
import { RecipeProps } from '@/app/types/types';



export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeProps[]>([]);
  const [allRecipes, setAllRecipes] = useState<RecipeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all recipes
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        // Access the recipes array from the response
        setAllRecipes(data.recipes || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setAllRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);
    
    // Filter recipes that are in localStorage (favorites)
    const favorites = allRecipes.filter(recipe => 
      keys.includes(recipe.id.toString())
    );

    setFavoriteRecipes(favorites);
  }, [allRecipes]);

  return (
    <div className="container mx-auto lg:py-2 p-6">
      <h1 className="text-3xl lg:text-5xl p-1 font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent mb-8 inline-block">Your Favorite Recipes</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 dark:border-amber-400"></div>
        </div>
      ) : favoriteRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
          You don&apos;t have any favorites yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}