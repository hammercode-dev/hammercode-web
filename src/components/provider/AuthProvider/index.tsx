"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "@/types";
import { decodeToken } from "@/lib/jwt";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const { username, email, role, isTokenExpired } = decodeToken(token);
        if (!isTokenExpired) {
          setUser({ username, email, role });
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromToken();
  }, []);

  const isAuthenticated = !!user;

  return <UserContext.Provider value={{ user, setUser, isAuthenticated, isLoading }}>{children}</UserContext.Provider>;
};
