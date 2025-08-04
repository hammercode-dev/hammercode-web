"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/domains/Auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useAuthService } from "../hooks/useAuth";

const ForgotPassPage = () => {
  const t = useTranslations("Auth.ForgotPassPage");
  const { forgotPassword, isLoading } = useAuthService();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (formData) => {
    forgotPassword(formData);
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden p-4">
      <div className="from-hmc-base-lightblue absolute -top-20 -left-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="from-hmc-base-lightblue absolute -right-20 -bottom-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="flex h-full items-center justify-center gap-12 overflow-hidden">
        <Image
          priority
          width={460}
          height={340}
          src="/assets/auth/signup-astronout.svg"
          alt="Forgot Password Background"
          className="hidden lg:block"
        />
        <div className="flex max-w-xl flex-col justify-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("enter-email")}
                        className="dark:ring-hmc-base-blue"
                        prefix={<Mail className="text-muted-foreground" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button
                  className="from-hmc-base-blue to-hmc-base-lightblue rounded-2xl bg-linear-to-l text-white"
                  type="submit"
                  loading={isLoading}
                >
                  {t("reset-password")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
