"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LockKeyhole, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "@/domains/Auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useAuth } from "../hooks/useAuth";

const SignInPage = () => {
  const t = useTranslations("Auth.SignInPage");
  const { login, isLoading } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (formData) => {
    login(formData);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden p-4">
      <div className="from-hmc-base-lightblue absolute -top-20 -left-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="from-hmc-base-lightblue absolute -right-20 -bottom-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="flex h-full flex-row-reverse items-center justify-center gap-12 overflow-hidden">
        <Image
          priority
          width={460}
          height={340}
          src="/assets/auth/signin-astronout.svg"
          alt="Sign In Background"
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
                  <Link href="/sign-up" className="text-hmc-base group-hover:underline">
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
