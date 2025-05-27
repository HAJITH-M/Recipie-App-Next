"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecipeProps {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: string;
}

const RecipeCard = ({ recipe }: { recipe: RecipeProps }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [like, setLike] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLike(!like);
    if (!like) {
      localStorage.setItem(`${recipe.id}`, `${recipe.name}`);
    } else {
      localStorage.removeItem(`${recipe.id}`);
    }
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const recid = localStorage.getItem(`${recipe.id}`);
    if (recid) {
      setLike(true);
    }
  }, []);

  const handleRecipeIdRoute = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/recipes/${recipe.id}`);
    }, 2000);
  };

  return (
    <div className="opacity-0 animate-fade-in bg-amber-50 dark:bg-amber-950/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full border border-amber-200 dark:border-amber-800/50 cursor-pointer">
      <div className="p-5 flex flex-col h-full relative">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${
              recipe.difficulty === "Easy"
                ? "bg-indigo-200 text-indigo-800 dark:bg-purple-900 dark:text-purple-200"
                : recipe.difficulty === "Medium"
                ? "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                : "bg-pink-200 text-pink-800 dark:bg-lavender-900 dark:text-lavender-200"
            }`}
          >
            {recipe.difficulty}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleShowDetails}
              className="p-2 rounded-full transition-colors cursor-pointer bg-indigo-100 text-indigo-600 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-indigo-200 dark:hover:bg-purple-800/30"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                like
                  ? "text-amber-600 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30"
                  : "text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30"
              }`}
            >
              {like ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {showDetails && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-20 left-0 right-0 bg-white dark:bg-amber-950 p-4 rounded-xl shadow-lg z-10 mx-4"
          >
            <h3 className="font-bold text-lg mb-2 text-indigo-800 dark:text-amber-200">{recipe.name}</h3>
            <p className="mb-2 text-gray-700 dark:text-amber-300">
              <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
            </p>
            <p className="mb-2 text-gray-700 dark:text-amber-300">
              <span className="font-semibold">Calories:</span>{" "}
              {recipe.caloriesPerServing} per serving
            </p>
            <p className="mb-2 text-gray-700 dark:text-amber-300">
              <span className="font-semibold">Cook Time:</span>{" "}
              {recipe.cookTimeMinutes} minutes
            </p>
            <p className="text-gray-700 dark:text-amber-300">
              <span className="font-semibold">Difficulty:</span>{" "}
              {recipe.difficulty}
            </p>
          </div>
        )}

        <div className="flex-grow flex flex-col items-center">
          <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/30 to-pink-200/30 dark:from-amber-900/30 dark:to-lavender-900/30 blur-lg"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-amber-200 dark:ring-amber-800 ring-offset-4 ring-offset-amber-50 dark:ring-offset-amber-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] dark:shadow-[0_0_25px_rgba(180,83,9,0.3)]">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-amber-100 dark:bg-amber-900">
                  <div className="w-10 h-10 border-4 border-amber-500 dark:border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={recipe.image}
                fill
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                alt={recipe.name}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
          <h2 className="text-xl lg:text-xl font-bold text-indigo-800 dark:text-amber-200 text-center mb-4 break-words hyphens-auto px-2 leading-tight">
            {recipe.name}
          </h2>
        </div>
        <div className="flex flex-col items-center w-full mt-auto space-y-4">
          <div className="flex items-center justify-center">
            <span className="text-base lg:text-lg font-medium text-indigo-600 dark:text-amber-400">
              {recipe.cuisine} Cuisine
            </span>
          </div>
          <div className="flex items-center justify-around w-full text-gray-700 dark:text-amber-300 text-xs lg:text-sm gap-2">
            <div className="flex items-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
              <svg
                className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{recipe.cookTimeMinutes} mins</span>
            </div>
            <div className="flex items-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
              <svg
                className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{recipe.caloriesPerServing} cal/serving</span>
            </div>
          </div>
          <button
            onClick={handleRecipeIdRoute}
            disabled={isLoading}
            className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl hover:from-indigo-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : (
              "View More"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;