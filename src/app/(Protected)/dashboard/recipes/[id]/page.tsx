import RecipeCard from "@/components/RecipieCard";
import Image from "next/image";

// Define the Recipe interface with consistent types
interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: string;
  ingredients: string[];
  instructions: string[];
  mealType: string[];
  rating: number;
  reviewCount: number;
  servings: number;
  tags: string[];
  prepTimeMinutes: number;
}

async function getRecipe(id: string) {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch recipe");
  return res.json();
}

async function getOtherRecipes(currentId: string) {
  const res = await fetch("https://dummyjson.com/recipes", { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch recipes");
  const data = await res.json();
  return data.recipes.filter((recipe: Recipe) => recipe.id.toString() !== currentId);
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/recipes", { cache: "force-cache" });
  const data = await res.json();
  return data.recipes.map((recipe: Recipe) => ({
    id: recipe.id.toString(),
  }));
}

export default async function RecipeDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const recipe: Recipe = await getRecipe(resolvedParams.id);
  const otherRecipes: Recipe[] = await getOtherRecipes(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[url('/culinary-pattern.svg')] dark:bg-slate-900 pt-2 px-3 lg:pt-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 ">
        {/* Main Recipe Details */}
        <div className="lg:w-3/4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-t-2xl shadow-2xl overflow-hidden transform transition-transform duration-300">
          <div className="relative h-[250px] sm:h-[500px] group ">
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={1280}
              height={720}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="space-y-2 sm:space-y-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2">
                    {recipe.mealType.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 sm:px-3 sm:py-1 bg-indigo-500 text-white text-sm sm:text-sm rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-3 font-serif">
                    {recipe.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-sm sm:text-base">
                    <p className="flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full mr-2 sm:mr-2"></span>
                      {recipe.cuisine} Cuisine
                    </p>
                    <p className="flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full mr-2 sm:mr-2"></span>
                      {recipe.cookTimeMinutes + recipe.prepTimeMinutes} min total
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            <div className="mb-6 dark:bg-slate-800/50 rounded-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < recipe.rating ? "text-pink-400" : "text-gray-300 dark:text-gray-600"
                        } transition-colors duration-300`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm sm:text-medium font-medium text-slate-700 dark:text-slate-300">
                    {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm sm:text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300 cursor-pointer shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[
                { label: "Difficulty", value: recipe.difficulty },
                { label: "Calories", value: `${recipe.caloriesPerServing} cal` },
                { label: "Prep Time", value: `${recipe.prepTimeMinutes} min` },
                { label: "Servings", value: recipe.servings },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 sm:p-4 text-center transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <p className="text-sm sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 sm:mb-1">
                    {item.label}
                  </p>
                  <p className="text-base sm:text-lg text-slate-900 dark:text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
                  Ingredients
                </h2>
                <div className="relative pl-8 sm:pl-8 space-y-6 sm:space-y-8">
                  <div className="absolute top-0 left-3 sm:left-3 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-5 sm:-left-5 top-3 w-3 h-3 sm:w-3 sm:h-3 bg-indigo-500 rounded-full shadow-md shadow-indigo-500/50"></div>
                      <div className="p-3 sm:p-4 bg-white dark:bg-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-x-1 hover:translate-y-0.5 transition-transform">
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200">{ingredient}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
                  Instructions
                </h2>
                <ol className="space-y-4 sm:space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="group">
                      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 group-hover:bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-colors duration-300">
                          {index + 1}
                        </span>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Other Recipes */}
        <div className="lg:w-1/4 mt-8 lg:mt-0 bg-slate-50 dark:bg-slate-800/50  rounded-xl lg:bg-transparent lg:dark:bg-transparent lg:p-0">
          <h1 className="text-3xl lg:text-3xl py-1 font-bold bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-purple-400 dark:to-lavender-400 bg-clip-text text-transparent">
            Other Recipes
          </h1>
          <div className="space-y-4 scrollbar p-2 lg:p-3 lg:pt-2 max-h-[1400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/80 dark:scrollbar-thumb-purple-400/80 hover:scrollbar-thumb-indigo-600 dark:hover:scrollbar-thumb-purple-300 scrollbar-track-slate-200/50 dark:scrollbar-track-slate-900/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full transition-all duration-300 ease-in-out">
            {otherRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={{ ...recipe, cookTimeMinutes: recipe.cookTimeMinutes.toString() }} />
            ))}
          </div>
        </div>      
        
      </div>
    </div>
  );
}