import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from "@/domains/Auth";
import { authService } from "@/services/auth";
import { AuthJwtPayload } from "@/types";

export const useAuth = () => {
  const t = useTranslations("Auth.Hook");
  const router = useRouter();
  const { setUser } = useAuthUser();

  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await authService.login(payload);

      localStorage.setItem("accessToken", res.data);
      const user = jwtDecode<AuthJwtPayload>(res.data);
      setUser(user);

      if (user.role === "admin") {
        router.replace("/"); // TODO: redirect to admin dashboard
      } else {
        router.push("/");
      }
      toast.success(t("sign-in-success"));

      return res.data;
    } catch (err) {
      toast((err as Error)?.message || t("sign-in-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterForm) => {
    setIsLoading(true);
    try {
      const res = await authService.register(payload);

      router.push("/sign-in");
      toast.success(t("sign-up-success"));

      return res.data;
    } catch (err) {
      toast.error((err as Error)?.message || t("sign-up-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (payload: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(payload);
      toast.success(t("forgot-password-success"));
      return res.data;
    } catch (err) {
      toast.error((err as Error)?.message || t("forgot-password-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (payload: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      const res = await authService.resetPassword(payload);
      toast.success(t("reset-password-success"));
      return res.data;
    } catch (err) {
      toast.error((err as Error)?.message || t("reset-password-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/sign-in");
  };

  return { login, register, logout, isLoading, forgotPassword, resetPassword };
};
