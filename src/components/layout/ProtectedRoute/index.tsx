"use client";

import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

/**
 * Protects a route by checking if the user is authenticated and has required role
 */
export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthUser();
  const router = useRouter();

  // Check if user has required role (if no role required, always true)
  const hasRequiredRole = !requiredRole || user?.role === requiredRole;
  // User can access if authenticated and has required role
  const canAccess = isAuthenticated && hasRequiredRole;

  const redirectSignin = () => {
    router.replace("/sign-in");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      redirectSignin();
      return;
    }

    if (!hasRequiredRole) {
      router.replace("/");
      return;
    }
  }, [isAuthenticated, hasRequiredRole]);

  if (!canAccess) {
    return null;
  }

  return children;
}
