import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { UserType } from "@/domains/Profile";

export const profileService = {
  getUserId: async (): Promise<HttpResponse<UserType>> => {
    return fetcher.get("user");
  },
};
