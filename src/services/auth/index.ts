import { fetcher } from "../instance";
import { LoginForm } from "@/domains/Auth";
import { HttpResponse } from "@/types/http";

export const authService = {
  login(payload: LoginForm): Promise<HttpResponse<string>> {
    return fetcher.post("auth/login", payload);
  },

  // TODO: register
};
