"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "@/types";
import { decodeToken } from "@/lib/jwt";
// import { profileService } from "@/services/profile";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserProfile = async () => {
    setIsLoading(true);
    const token = await localStorage.getItem("accessToken");
    if (!token) return;

    const { isTokenExpired, username, role, email } = decodeToken(token);
    console.log(decodeToken(token));
    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
      return;
    }

    try {
      // const { data: user } = await profileService.getUserId();

      setUser({
        username: username,
        email: email,
        role: role,
        // phone_number: phone_number || '',
      });
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
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
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
