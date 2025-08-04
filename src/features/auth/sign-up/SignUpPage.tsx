"use client";
import Image from "next/image";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useTranslations } from "next-intl";
import { RegisterForm, registerSchema } from "@/domains/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@/lib/navigation";
import { useAuthService } from "../hooks/useAuth";

const SignUpPage = () => {
  const t = useTranslations("Auth.SignUpPage");
  const { register, isLoading } = useAuthService();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
    register(formData);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden p-4">
      <div className="from-hmc-base-lightblue/20 absolute -top-32 -right-32 size-96 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="from-hmc-base-lightblue/20 absolute -bottom-32 -left-32 size-96 rounded-full bg-radial to-transparent to-70% blur-3xl" />

      <div className="flex h-full items-center justify-center gap-12 overflow-hidden">
        <Image
          priority
          width={460}
          height={340}
          src="/assets/auth/signup-astronout.svg"
          alt="Sign Up Background"
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
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("enter-username")}
                        className="dark:ring-hmc-base-blue"
                        prefix={<User className="text-muted-foreground" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
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
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter-password")}
                        className="dark:ring-hmc-base-blue"
                        classIcon="text-muted-foreground"
                        prefix={<Lock className="text-muted-foreground" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("confirm-password")}
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
              <div className="group space-y-2">
                <Button
                  className="from-hmc-base-blue to-hmc-base-lightblue w-full rounded-2xl bg-linear-to-l text-white"
                  type="submit"
                  loading={isLoading}
                >
                  {t("sign-up")}
                </Button>
                <p className="text-center text-xs">
                  {t("have-account")}{" "}
                  <Link href="/sign-in" className="text-hmc-base-blue font-semibold group-hover:underline">
                    {t("sign-in")}
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
export default SignUpPage;
