"use client";

import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protects a route by checking if the user is authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
