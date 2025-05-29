'use client';

import { usePathname, useRouter } from "next/navigation";
import ProtectedRoute from "./protectedRoute";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Loader from "@/components/ui/loader";

// Define public routes that don't require authentication
const publicRoutes = ["/Login", "/register", "/", "/Signup"]; // Add other public routes as needed
// Define auth routes that should redirect to dashboard if already logged in
const authRoutes = ["/Login", "/Signup", "/register"];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = getCookie('email');
    
    // If user is logged in and trying to access login/signup pages, redirect to dashboard
    if (token && authRoutes.includes(pathname)) {
      router.push('/dashboard');
    }
    
    setIsLoading(false);
  }, [pathname, router]);
  
  if (isLoading) {
    return <Loader />;
  }
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}