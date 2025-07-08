"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "@/types";
import { decodeToken } from "@/lib/jwt";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const { username, email, role, isTokenExpired } = decodeToken(token);
    if (!isTokenExpired) {
      setUser({ username, email, role });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>{children}</UserContext.Provider>;
};
