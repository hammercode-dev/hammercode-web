import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { useToast } from "@/components/hooks/UseToast";
import { LoginForm, RegisterForm } from "@/domains/Auth";
import { jwtDecode } from "jwt-decode";
import { AuthJwtPayload } from "@/types";
import { useAuthUser } from "@/components/hooks/UseAuthUser";

export const useAuth = () => {
  const t = useTranslations("Auth.Hook");
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthUser();

  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await authService.login(payload);

      localStorage.setItem("accessToken", res.data);
      setUser(jwtDecode<AuthJwtPayload>(res.data));

      router.push("/");
      toast({ description: t("sign-in-success") });

      return res.data;
    } catch (err) {
      toast({ description: (err as Error)?.message || t("sign-in-failed"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterForm) => {
    setIsLoading(true);
    try {
      const res = await authService.register(payload);

      router.push("/sign-in");
      toast({ description: t("sign-up-success") });

      return res.data;
    } catch (err) {
      toast({ description: (err as Error)?.message || t("sign-up-failed"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/sign-in");
  };

  return { login, register, logout, isLoading };
};
