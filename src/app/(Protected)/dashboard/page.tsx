'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('accessToken');
    router.push('/Login');
  };

  const getRecipies = async () => {
    try {
      const res = await fetch('https://dummyjson.com/recipes');
      const data = await res.json();
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getRecipies();
  }, [])


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Statistics</h2>
            <div className="text-3xl font-bold text-blue-500">1,234</div>
            <p className="text-gray-600 dark:text-gray-400">Total Users</p>
          </div>

          {/* Activity Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">User login - 2 mins ago</li>
              <li className="text-gray-600 dark:text-gray-400">New post created - 5 mins ago</li>
              <li className="text-gray-600 dark:text-gray-400">Profile updated - 10 mins ago</li>
            </ul>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Create New Post
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}