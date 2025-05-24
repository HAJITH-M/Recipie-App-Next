'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import useSWR from 'swr';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import path from 'path';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
    if (!like) {
      localStorage.setItem(`${recipe.id}`, `${recipe.name}`);
    } else {
      localStorage.removeItem(`${recipe.id}`);
    }
  }

  useEffect(() => {
    const recid = localStorage.getItem(`${recipe.id}`);
    if (recid) {
      setLike(true);
    }
    
  }, []);
  
  return( 
    <div className="opacity-0 animate-fade-in bg-gradient-to-tr from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full border border-emerald-100 dark:border-slate-700"> 
      <div className="p-5 flex flex-col h-full relative">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${ 
            recipe.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 
            recipe.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' : 
            'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' 
          }`}> 
            {recipe.difficulty} 
          </span>
        
        {/* Like Button */}
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              like
                ? 'text-rose-600 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/30'
                : 'text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30'
            }`}
          >
            {like ? (
              // Filled Heart
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                  4.42 3 7.5 3c1.74 0 3.41 0.81 
                  4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 
                  3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                  11.54L12 21.35z" />
              </svg>
            ) : (
              // Outlined Heart
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
          {/* End Like Button */}

        </div>
        <div className="flex-grow flex flex-col items-center">
          <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-6"> 
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 dark:from-emerald-900/30 dark:to-teal-900/30 blur-lg"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-emerald-200 dark:ring-emerald-700 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 dark:bg-slate-800">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image 
                src={recipe.image} 
                fill 
                className={`object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                alt={recipe.name}
                onLoad={() => setImageLoaded(true)}
              /> 
            </div> 
          </div> 
          <h2 className="text-xl lg:text-xl font-bold text-slate-800 dark:text-white text-center mb-4 break-words hyphens-auto px-2 leading-tight">{recipe.name}</h2> 
        </div>
        <div className="flex flex-col items-center w-full mt-auto space-y-4">
          <div className="flex items-center justify-center"> 
            <span className="text-base lg:text-lg font-medium text-emerald-600 dark:text-emerald-400">{recipe.cuisine} Cuisine</span> 
          </div> 
          <div className="flex items-center justify-around w-full text-slate-700 dark:text-slate-300 text-xs lg:text-sm gap-2"> 
            <div className="flex items-center flex-shrink-0 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full"> 
              <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> 
              </svg> 
              <span>{recipe.cookTimeMinutes} mins</span> 
            </div> 
            <div className="flex items-center flex-shrink-0 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full"> 
              <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <Navbar/>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">Recipe Collection</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-3 text-base font-medium bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Logout
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-emerald-100/50 dark:bg-slate-800/50 rounded-2xl h-96"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm">
            <div className="text-rose-500 dark:text-rose-400 text-xl font-medium mb-4">Failed to load recipes</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {data?.recipes?.map((recipe: RecipeProps) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}