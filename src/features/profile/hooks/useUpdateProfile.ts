import { ProfileFormType } from "@/domains/Profile";
import { profileService } from "@/services/profile";
import { useMutation } from "@tanstack/react-query";

const useUpdateProfile = () =>
  useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (payload: ProfileFormType) => profileService.updateProfile(payload),
  });

export default useUpdateProfile;
