"use client"

import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { User, Lock, ChefHat, CakeSlice } from "lucide-react"

const getUser = async (email: string, password: string) => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })

  const data = await res.json()
  console.log(data)
  return data
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
    error: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userData = await getUser(formData.userEmail, formData.userPassword)
      console.log(userData)

      if (userData.accessToken) {
        setCookie('accessToken', userData.accessToken, { maxAge: 60 * 60 * 24 })
        console.log('User logged in successfully:', userData)
        router.push('/')
      } else {
        setFormData((prev) => ({ ...prev, error: 'Invalid credentials' }))
      }
    } catch (error) {
      console.error('Error:', error)
      setFormData((prev) => ({
        ...prev,
        error: 'An error occurred. Please try again later.',
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-amber-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">




      <div className="max-w-md w-full bg-white/80 dark:bg-amber-950/50 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800/50 p-8 transform hover:scale-[1.02] transition-transform duration-300 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <ChefHat className="w-10 h-10 text-indigo-800 dark:text-amber-200" />
          <h1 className="text-3xl font-bold text-center text-indigo-800 dark:text-amber-200">
            RecipeApp
          </h1>
          <CakeSlice className="w-10 h-10 text-indigo-800 dark:text-amber-200" />
        </div>
        <p className="text-center text-indigo-600 dark:text-amber-300 mb-8">Welcome back, chef! Let's start cooking.</p>
        {formData.error && (

          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mb-4">
            <p className="text-red-500 dark:text-red-400 text-center text-sm">{formData.error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-indigo-800 dark:text-amber-300 mb-1">
              Username
            </label>

            <div className="relative group">
              <input
                type="text"
                id="email"
                value={formData.userEmail}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, userEmail: e.target.value }))
                }

                className="w-full px-4 py-2 pl-10 rounded-lg border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-amber-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-400 transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-amber-600"
                placeholder="Enter your username"
                required
              />

              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-indigo-800 dark:text-amber-300 mb-1">
              Password
            </label>

            <div className="relative group">
              <input
                type="password"
                id="password"
                value={formData.userPassword}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, userPassword: e.target.value }))
                }

                className="w-full px-4 py-2 pl-10 rounded-lg border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-amber-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-400 transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-amber-600"
                placeholder="Enter your password"
                required
              />

              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-lg hover:from-indigo-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>

                Preparing your kitchen...
              </div>
            ) : (

              "Start Cooking"
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-indigo-600 dark:text-amber-400">
          New to RecipeApp? <a href="/signup" className="underline hover:text-indigo-800 dark:hover:text-amber-200">Create an account</a>
        </p>
      </div>
    </div>
  )
}