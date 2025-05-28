  "use client";

  import Image from "next/image";
import Link from "next/link";

  export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-amber-950">
        <div className="max-w-md w-full p-8 bg-white dark:bg-amber-900/50 rounded-2xl shadow-xl border border-amber-200 dark:border-amber-800/50">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/30 to-pink-200/30 dark:from-amber-900/30 dark:to-lavender-900/30 blur-lg"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-amber-200 dark:ring-amber-800 ring-offset-4 ring-offset-amber-50 dark:ring-offset-amber-950">
                <Image
                  src="https://ik.imagekit.io/k5gvskw6y/image.png"
                  alt="Error"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          
            <h2 className="text-2xl font-bold text-indigo-800 dark:text-amber-200 mb-4">
              Page Not Found
            </h2>
          
            <p className="text-gray-700 dark:text-amber-300 mb-8">
              The page you are looking for does not exist.
            </p>

            <div className="flex gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl hover:from-indigo-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Go Home
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-indigo-500 text-white rounded-xl hover:from-amber-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
