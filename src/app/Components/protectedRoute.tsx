'use client';

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('accessToken');

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/Login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-bounce mb-4">
            🍳
          </div>
          <div className="animate-pulse text-lg font-medium text-gray-600">
            Preparing your recipes...
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Stirring up some delicious content
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;