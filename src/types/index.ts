import { JwtPayload } from "jwt-decode";

export interface AuthJwtPayload extends JwtPayload {
  username: string;
  email: string;
  role: string;
  // phone_number: string;
}

export interface User {
  username: string;
  email: string;
  // phone_number: string;
  role: string | "admin";
}

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  isLoading: boolean;
}
