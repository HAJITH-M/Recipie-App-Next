'use client';

import Loader from "@/components/ui/loader";
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
    const token = getCookie('email');

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/Login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <>
      <Loader/>
      </>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;