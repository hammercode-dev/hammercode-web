"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "@/types";
import { decodeToken } from "@/lib/jwt";
import { profileService } from "@/services/profile";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const { isTokenExpired } = decodeToken(token);

    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
      return;
    }

    try {
      const { data: user } = await profileService.getUserId();

      setUser({
        username: user?.username,
        email: user?.email,
        role: user?.role,
        phone_number: user?.phone_number,
      });
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
