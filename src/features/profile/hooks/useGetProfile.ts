import { profileService } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () =>
  useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await profileService.getProfile();
      return response.data;
    },
  });

export default useGetProfile;
