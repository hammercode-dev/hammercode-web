import { useContext } from "react";
import { UserContext } from "@/components/provider/AuthProvider";
import { UserContextType } from "@/types";

export const useAuthUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuthUser must be used within an AuthProvider");
  return context;
};
