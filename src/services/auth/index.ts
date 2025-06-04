import { fetcher } from "../instance";
import { LoginForm, RegisterForm } from "@/domains/Auth";
import { User } from "@/features/auth/types";
import { HttpResponse } from "@/types/http";

export const authService = {
  login(payload: LoginForm): Promise<HttpResponse<string>> {
    return fetcher.post("auth/login", payload);
  },

  register(payload: RegisterForm): Promise<HttpResponse<User>> {
    return fetcher.post("auth/register", payload);
  },
};
