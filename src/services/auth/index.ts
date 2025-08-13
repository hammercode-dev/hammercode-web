import axios from "axios";
import { fetcher } from "../instance";
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from "@/domains/Auth";
import { User } from "@/features/auth/types";
import { AuthJwtPayload } from "@/types";
import { HttpResponse } from "@/types/http";

export const authService = {
  /**
   * Authenticates user with email and password from local server
   * @param payload - Login credentials
   */
  login(payload: LoginForm): Promise<HttpResponse<{ token: string; payload: AuthJwtPayload }>> {
    return axios.post("/api/login", payload);
  },

  /**
   * Logs out the current user from local server
   */
  logout(): Promise<HttpResponse<unknown>> {
    return axios.post("/api/logout");
  },

  /**
   * Registers a new user account
   * @param payload - Registration data
   */
  register(payload: RegisterForm): Promise<HttpResponse<User>> {
    return fetcher.post("/auth/register", payload);
  },

  /**
   * Initiates password reset process
   * @param payload - Forgot password data
   */
  forgotPassword(payload: ForgotPasswordForm): Promise<HttpResponse<string>> {
    return fetcher.post("/auth/forgot-password", payload);
  },

  /**
   * Resets user password with token
   * @param payload - Reset password data including token
   */
  resetPassword(payload: ResetPasswordForm): Promise<HttpResponse<string>> {
    return fetcher.post("/auth/reset-password", payload);
  },
};
