"use client";

import { createContext, ReactNode, useState } from "react";
import { AuthJwtPayload, UserContextType } from "@/types";

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface AuthProviderProps {
  /**
   * JWT Payload taken from cookie
   * @default undefined
   */
  payload?: AuthJwtPayload;
  children: ReactNode;
}

export const AuthProvider = ({ payload, children }: AuthProviderProps) => {
  const [user, setUser] = useState(payload || null);
  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, isLoading: false }}>{children}</UserContext.Provider>
  );
};
