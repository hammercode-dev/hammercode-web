import { AuthJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string): {
  isTokenExpired: boolean;
  username: string;
  email: string;
  err?: unknown;
} {
  try {
    const decoded = jwtDecode<AuthJwtPayload>(token);
    const currentTime = Date.now() / 1000;

    const isTokenExpired = decoded.exp ? decoded.exp < currentTime : true;

    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
    }

    return { username: decoded.username, email: decoded.email, isTokenExpired };
  } catch (e) {
    return { err: e, isTokenExpired: true, username: "", email: "" };
  }
}
