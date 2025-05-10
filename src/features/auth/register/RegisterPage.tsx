"use client";
import Image from "next/image";
import Link from "next/link";
import { Lock, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { InputPassword } from "@/components/ui/InputPassword";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
  const form = useForm();
  const t = useTranslations("AuthPage.RegisterPage");
  return (
    <div className="w-screen h-screen p-4 relative overflow-hidden">
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -top-20 -left-20 blur-3xl"></div>
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -bottom-20 -right-20 blur-3xl"></div>
      <div className="flex min-h-full relative overflow-hidden justify-center items-center gap-10">
        <Image
          width={399}
          height={330}
          priority
          src="/assets/auth/signup-astronout.svg"
          alt="Sign Up Background"
          className="hidden lg:block w-2/5 h-2/5"
        />
        <div className="flex flex-col items-center justify-center lg:w-4/12">
          <div className="flex flex-col gap-6 mx-auto lg:w-96">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-4xl">{t("title")}</h1>
              <p className="text-sm text-[#828282] mt-2">{t("description")}</p>
            </div>
            <div className="flex flex-col gap-4">
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
                          className="focus-visible:ring-black dark:ring-hmc-base-blue"
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
                          className="focus-visible:ring-black dark:ring-hmc-base-blue"
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
                        <InputPassword
                          type="password"
                          placeholder={t("enter-password")}
                          colorIcon="text-[#828282]"
                          className="dark:ring-hmc-base-blue"
                          suffix={<Lock className="text-[#828282]" />}
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
                        <InputPassword
                          type="password"
                          placeholder={t("conf-password")}
                          colorIcon="text-[#828282]"
                          className="dark:ring-hmc-base-blue"
                          suffix={<LockKeyhole className="text-[#828282]" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
            <div className="flex flex-col gap-2 group">
              <Button className="text-white rounded-2xl bg-linear-to-l from-hmc-base-blue to-hmc-base-lightblue">
                {t("Register-button")}
              </Button>
              <p className="text-xs text-center">
                {t("sub-description")}{" "}
                <Link href="/sign-in" className="text-hmc-base group-hover:underline">
                  {t("Login-button")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
