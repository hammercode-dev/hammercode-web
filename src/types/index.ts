import { JwtPayload } from "jwt-decode";

export interface AuthJwtPayload extends JwtPayload {
  username: string;
  email: string;
  role: string;
}

export interface User {
  username: string;
  email: string;
  role: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}
