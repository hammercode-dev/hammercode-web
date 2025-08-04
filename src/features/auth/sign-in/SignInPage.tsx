"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LockKeyhole, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { LoginForm, loginSchema } from "@/domains/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/lib/navigation";
import { useAuthService } from "../hooks/useAuth";
import { useAuthUser } from "@/components/hooks/UseAuthUser";

const SignInPage = () => {
  const t = useTranslations("Auth.SignInPage");
  const { login, isLoading } = useAuthService();
  const { setUser } = useAuthUser();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (formData) => {
    login(formData).then((data) => {
      setUser(data!.data.payload);
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden p-4">
      <div className="from-hmc-base-lightblue/20 absolute -top-32 -right-32 size-96 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="from-hmc-base-lightblue/20 absolute -bottom-32 -left-32 size-96 rounded-full bg-radial to-transparent to-70% blur-3xl" />

      <div className="flex h-full flex-row-reverse items-center justify-center gap-12 overflow-hidden">
        <Image
          priority
          width={460}
          height={340}
          src="/assets/auth/signin-astronout.svg"
          alt="Sign In Background"
          className="hidden lg:block"
        />
        <div className="flex w-full flex-col justify-center gap-6 md:w-1/3">
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
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter-password")}
                        className="dark:ring-hmc-base-blue"
                        classIcon="text-muted-foreground"
                        prefix={<LockKeyhole className="text-muted-foreground" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="group text-hmc-base text-right text-xs">
                <Link href="/forgot-password" className="text-hmc-base group-hover:underline">
                  {t("forgot-password")}
                </Link>
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  className="from-hmc-base-blue to-hmc-base-lightblue rounded-2xl bg-linear-to-l text-white"
                  type="submit"
                  loading={isLoading}
                >
                  {t("sign-in")}
                </Button>
                <p className="group text-center text-xs">
                  {t("no-account")}{" "}
                  <Link href="/sign-up" className="text-hmc-base-blue font-semibold group-hover:underline">
                    {t("sign-up")}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
