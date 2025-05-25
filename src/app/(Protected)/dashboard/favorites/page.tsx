"use client";

import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipieCard';

interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: string;
}

export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

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
    <div className="container mx-auto  py-4">
      <h1 className="text-3xl font-bold text-indigo-800 dark:text-white mb-8">Your Favorite Recipes</h1>
      
      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You haven't added any recipes to your favorites yet.
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