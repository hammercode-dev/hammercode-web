"use client";
import Image from "next/image";
import Link from "next/link";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const form = useForm();
  const t = useTranslations("Auth.SignUpPage");

  return (
    <div className="relative h-screen w-screen overflow-hidden p-4">
      <div className="from-hmc-base-lightblue absolute -top-20 -left-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="from-hmc-base-lightblue absolute -right-20 -bottom-20 size-70 rounded-full bg-radial to-transparent to-70% blur-3xl" />
      <div className="flex h-full items-center justify-center gap-12 overflow-hidden">
        <Image
          width={480}
          height={360}
          priority
          src="/assets/auth/signup-astronout.svg"
          alt="Sign Up Background"
          className="hidden lg:block"
        />
        <div className="flex max-w-xl flex-col justify-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
          <div className="space-y-4">
            <Form {...form}>
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
            </Form>
          </div>
          <div className="group space-y-2">
            <Button className="from-hmc-base-blue to-hmc-base-lightblue w-full rounded-2xl bg-linear-to-l text-white">
              {t("sign-up")}
            </Button>
            <p className="text-center text-xs">
              {t("have-account")}{" "}
              <Link href="/sign-in" className="text-hmc-base group-hover:underline">
                {t("sign-in")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
