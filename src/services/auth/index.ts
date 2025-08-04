import { fetcher } from "../instance";
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from "@/domains/Auth";
import { User } from "@/features/auth/types";
import { HttpResponse } from "@/types/http";
import axios from "axios";

export const authService = {
  login(payload: LoginForm): Promise<HttpResponse<string>> {
    return axios.post("/api/login", payload);
  },

  logout(): Promise<HttpResponse<unknown>> {
    return axios.post("/api/logout");
  },

  getToken(payload: LoginForm): Promise<HttpResponse<string>> {
    return fetcher.post("auth/login", payload);
  },

  register(payload: RegisterForm): Promise<HttpResponse<User>> {
    return fetcher.post("auth/register", payload);
  },

  forgotPassword(payload: ForgotPasswordForm): Promise<HttpResponse<string>> {
    return fetcher.post("auth/forgot-password", payload);
  },

  resetPassword(payload: ResetPasswordForm): Promise<HttpResponse<string>> {
    return fetcher.post("auth/reset-password", payload);
  },
};
