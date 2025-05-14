import { useState } from "react";
import { useToast } from "@/components/hooks/UseToast";
import { LoginForm } from "@/domains/Auth";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const useAuth = () => {
  const t = useTranslations("Auth.Hook");
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await authService.login(payload);

      localStorage.setItem("accesToken", res.data);
      router.push("/");
      toast({ description: t("sign-in-success") });

      return res.data;
    } catch (err) {
      toast({ description: (err as Error)?.message || t("sign-in-failed"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: register

  return { login, isLoading };
};
