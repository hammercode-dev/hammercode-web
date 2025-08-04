"use client";

import { createContext, ReactNode } from "react";
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
  const user = payload || null;
  const isAuthenticated = !!user;

  return <UserContext.Provider value={{ user, isAuthenticated, isLoading: false }}>{children}</UserContext.Provider>;
};
