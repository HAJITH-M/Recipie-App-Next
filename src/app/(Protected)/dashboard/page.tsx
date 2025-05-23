'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import useSWR from 'swr';
import Image from 'next/image';

interface RecipeProps{
  id: number;
  name: string;
  cuisine: string;
  image: string;
  caloriesPerServing: number;
  difficulty: string;
  cookTimeMinutes: string;
}

const RecipeCard = ({recipe}: {recipe: RecipeProps}) =>{ 
  return( 
    <div className="bg-gradient-to-br from-white via-[#FDF1F3] to-[#F8E6E9] dark:from-[#2D0912] dark:via-[#4A1522] dark:to-[#67001F] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full"> 
      <div className="p-3 sm:p-4 lg:p-6 flex flex-col h-full relative backdrop-blur-sm bg-white/5">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${ 
            recipe.difficulty === 'Easy' ? 'bg-[#F4CDD4] text-[#67001F] dark:bg-[#F4CDD4] dark:text-[#67001F]' : 
            recipe.difficulty === 'Medium' ? 'bg-[#B31B41] text-white dark:bg-[#B31B41] dark:text-white' : 
            'bg-[#67001F] text-white dark:bg-[#67001F] dark:text-white' 
          }`}> 
            {recipe.difficulty} 
          </span>
          <button className="text-[#B31B41] hover:text-[#67001F] dark:text-[#F4CDD4] dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-grow flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-3 sm:mb-4"> 
            <div className="absolute inset-0 bg-gradient-to-b from-[#F4CDD4] to-[#B31B41] dark:from-[#B31B41] dark:to-[#67001F] rounded-full shadow-inner"></div> 
            <div className="absolute inset-2 rounded-full overflow-hidden ring-2 sm:ring-4 ring-[#B31B41] dark:ring-[#F4CDD4] shadow-lg"> 
              <Image 
                src={recipe.image} 
                fill 
                className="object-cover" 
                alt={recipe.name} 
              /> 
            </div> 
          </div> 
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#67001F] dark:text-white text-center mb-2 sm:mb-3 break-words hyphens-auto px-2">{recipe.name}</h2> 
        </div>
        <div className="flex flex-col items-center w-full mt-auto space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center mb-1.5 sm:mb-2"> 
            <span className="text-xs sm:text-sm lg:text-base text-[#B31B41] dark:text-[#F4CDD4]">{recipe.cuisine} Cuisine</span> 
          </div> 
          <div className="flex items-center justify-around w-full text-[#B31B41] dark:text-[#F4CDD4] text-xs sm:text-sm gap-2 flex-wrap"> 
            <div className="flex items-center"> 
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> 
              </svg> 
              <span>{recipe.cookTimeMinutes} mins</span> 
            </div> 
            <div className="flex items-center"> 
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> 
              </svg> 
              <span>{recipe.caloriesPerServing} cal/serving</span> 
            </div> 
            
          </div> 
        </div> 
      </div> 
    </div> 
  ) 
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  console.log(data)
  return data;
};

export default function Dashboard() {
  const router = useRouter();
  
  const { data, error, isLoading } = useSWR('https://dummyjson.com/recipes', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  const handleLogout = () => {
    deleteCookie('accessToken');
    router.push('/Login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FDF1F3] to-[#F8E6E9] dark:from-[#67001F] dark:via-[#B31B41] dark:to-[#F4CDD4] backdrop-blur-sm bg-opacity-95 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white dark:text-[#F4CDD4] text-center sm:text-left">Recipe Collection</h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#B31B41] text-white rounded-lg hover:bg-[#67001F] transition-colors"
          >
            Logout
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-indigo-800/20 rounded-xl h-48 sm:h-64 lg:h-72"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-6 sm:py-8">
            <div className="text-rose-500 text-base sm:text-lg lg:text-xl">Failed to load recipes</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {data?.recipes?.map((recipe: RecipeProps) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}