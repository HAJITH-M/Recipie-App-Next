"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Lock, ChefHat, CakeSlice } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define the expected shape of the API response
interface LoginResponse {
  message: string;
  email?: string;
}

const getUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await fetch("/api/loginapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data: LoginResponse = await res.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData((prev) => ({ ...prev, error: "" }));

    try {
      const userData = await getUser(formData.email, formData.password);

      console.log("Login response:", userData);

      if (userData.message === "Login successful") {
        if (userData.email) {
          // Set the 'email' cookie using the email from the response
          setCookie("email", userData.email, {
            maxAge: 60 * 60 * 24, // 1 day
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          console.log("User logged in successfully:", userData);
          router.push("/dashboard");
        } else {
          console.error("Email is missing in response:", userData);
          setFormData((prev) => ({
            ...prev,
            error: "Authentication failed: No email received. Please try again.",
          }));
        }
      } else {
        const errorMessage = userData.message || "Login failed. Please check your credentials.";
        setFormData((prev) => ({ ...prev, error: errorMessage }));
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message.includes("fetch")
            ? "Unable to reach the server. Please check your connection."
            : error.message
          : "Failed to connect to the server. Please try again.";
      setFormData((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-amber-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/80 dark:bg-amber-950/50 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800/50 p-8 transform hover:scale-[1.02] transition-transform duration-300 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <ChefHat className="w-10 h-10 text-indigo-500 dark:text-amber-400 transform hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <div className="relative w-24 h-24 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://ik.imagekit.io/k5gvskw6y/image.png"
                alt="RecipeApp Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-300">
              RecipeApp
            </h1>
          </div>
          <CakeSlice className="w-10 h-10 text-amber-500 dark:text-indigo-400 transform hover:scale-110 transition-transform duration-300" />
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
              Email
            </label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-amber-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-400 transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-amber-600"
                placeholder="Enter your email"
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
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
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
        <p className="mt-6 text-center text-sm text-indigo-600 dark:text-amber-300">
          New to RecipeApp? <Link href="/Signup" className="underline hover:text-indigo-800 dark:hover:text-amber-200">Create an account</Link>
        </p>
      </div>
    </div>
  );
}