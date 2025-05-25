'use client';

import { usePathname } from "next/navigation";
import ProtectedRoute from "./protectedRoute";

// Define public routes that don't require authentication
const publicRoutes = ["/Login", "/register", "/"]; // Add other public routes as needed

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}