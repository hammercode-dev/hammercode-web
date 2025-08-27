import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { ProfileResType } from "@/domains/Profile";

export const profileService = {
  /**
   * API to get detail profile user
   */
  getProfile: async (): Promise<HttpResponse<ProfileResType>> => {
    return fetcher.get("/user");
  },
};
