import { fetcher } from "../instance";
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from "@/domains/Auth";
import { User } from "@/features/auth/types";
import { AuthJwtPayload } from "@/types";
import { HttpResponse } from "@/types/http";
import axios from "axios";

export const authService = {
  login(payload: LoginForm): Promise<HttpResponse<{ token: string; payload: AuthJwtPayload }>> {
    return axios.post("/api/login", payload);
  },

  logout(): Promise<HttpResponse<unknown>> {
    return axios.post("/api/logout");
  },

  getToken(payload: LoginForm): Promise<string> {
    // FIXME
    return axios
      .post("https://lms-be-development.hammercode.org/api/v1/auth/login", payload)
      .then((res) => res.data.data);
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
