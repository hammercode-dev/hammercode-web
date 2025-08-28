import { ProfileFormType } from "@/domains/Profile";
import { profileService } from "@/services/profile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const useUpdateProfile = () => {
  const t = useTranslations("Profile");

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (payload: ProfileFormType) => profileService.updateProfile(payload),
    onSuccess: () => {
      toast.success(t("toast.update-success"));
    },
  });
};

export default useUpdateProfile;
