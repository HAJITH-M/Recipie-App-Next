'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sha256 } from 'js-sha256'; // Browser-compatible hashing
import { setCookie } from 'cookies-next'; // Import setCookie from cookies-next
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      setIsLoading(true);
      // Get users from localStorage
      const usersJSON = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersJSON);
      
      // Find user by email
      const user = users.find((u: { email: string }) => u.email === email);
      
      if (!user) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      // Compare password with hashed password using the same salt
      const hashedPassword = sha256(password + user.salt);
      const passwordMatch = hashedPassword === user.password;
      
      if (!passwordMatch) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      // Store user info in localStorage for authentication state
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
      
      // Set email in cookie using cookies-next
      setCookie('email', user.email, {
        maxAge: 60 * 60 * 24, // 1 day in seconds
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Redirect to dashboard or home page with a slight delay for animation
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      setError('Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-slate-900 p-4">
      <div className="opacity-0 animate-fade-in w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Image src="https://ik.imagekit.io/k5gvskw6y/image.png" alt="Logo" width={64} height={64} className="h-16 w-auto mb-4 rounded-full" />
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-800 dark:text-slate-200">Welcome Back</h1>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-amber-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-slate-400 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-amber-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-slate-400 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-3 cursor-pointer bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl hover:from-indigo-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Don't have an account?{" "}
              <a href="/Signup" className="font-medium text-indigo-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-slate-200 transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}