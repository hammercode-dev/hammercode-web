import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { UserType } from "@/domains/Profile";

export const profileService = {
  getProfile: async (): Promise<HttpResponse<UserType>> => {
    return fetcher.get("user");
  },
};
