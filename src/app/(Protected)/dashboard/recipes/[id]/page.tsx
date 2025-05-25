interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: number;
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
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/recipes');
  const data = await res.json();
  
  return data.recipes.map((recipe: Recipe) => ({
    id: recipe.id.toString()
  }));
}

export default async function RecipeDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const recipe: Recipe = await getRecipe(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[url('/culinary-pattern.svg')] dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300">
        <div className="relative h-[500px] group">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="w-full h-full object-cover transition-transform duration-500 " 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {recipe.mealType.map((type, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/80 text-white text-sm rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
                <h1 className="text-5xl font-bold text-white mb-3 font-serif">{recipe.name}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                    {recipe.cuisine} Cuisine
                  </p>
                  <p className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                    {recipe.cookTimeMinutes + recipe.prepTimeMinutes} min total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
                  {/* Ratings and Tags Section */}
          <div className="mb-4 dark:bg-slate-800/50 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < recipe.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} transition-colors duration-300`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-medium font-medium text-slate-700 dark:text-slate-300">
                  {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300 cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Difficulty', value: recipe.difficulty },
              { label: 'Calories', value: `${recipe.caloriesPerServing} cal` },
              { label: 'Prep Time', value: `${recipe.prepTimeMinutes} min` },
              { label: 'Servings', value: recipe.servings },
            ].map((item, index) => (
              <div key={index} className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-1">{item.label}</p>
                <p className="text-slate-900 dark:text-white text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>

    

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ingredients Timeline */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Ingredients</h2>
              <div className="relative pl-8 space-y-8">
                <div className="absolute top-0 left-3 h-full w-0.5 bg-emerald-200 dark:bg-emerald-800"></div>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-5 top-3 w-3 h-3 bg-emerald-500 rounded-full shadow-md shadow-emerald-500/50"></div>
                    <div className="p-4 bg-white dark:bg-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-x-1 hover:translate-y-0.5 transition-transform">
                      <span className="text-slate-700 dark:text-slate-200">{ingredient}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Instructions</h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="group">
                    <div className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 group-hover:bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold transition-colors duration-300">
                        {index + 1}
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}