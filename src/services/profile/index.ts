import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { ProfileResType, ProfileFormType } from "@/domains/Profile";

export const profileService = {
  /**
   * API to get detail profile user
   */
  getProfile: async (): Promise<HttpResponse<ProfileResType>> => {
    return fetcher.get("/user");
  },

  /**
   * API to update profile user
   *  @param payload - new profile user data
   */
  updateProfile: async (payload: ProfileFormType): Promise<HttpResponse<ProfileResType>> => {
    return fetcher.put("/update", payload);
  },
};
