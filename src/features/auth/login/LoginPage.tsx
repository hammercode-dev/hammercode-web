"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { InputPassword } from "@/components/ui/InputPassword";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const form = useForm();
  const t = useTranslations("AuthPage.LoginPage");
  return (
    <div className="w-screen h-screen p-4 relative overflow-hidden">
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -top-20 -left-20 blur-3xl"></div>
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -bottom-20 -right-20 blur-3xl"></div>
      <div className="flex min-h-full relative overflow-hidden justify-center items-center">
        <div className="flex flex-col items-center justify-center lg:w-4/12">
          <div className="flex flex-col gap-10 mx-auto lg:w-96">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-4xl">{t("title")}</h1>
              <p className="text-sm text-[#828282] mt-2">{t("description")}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <FormField
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputPassword
                          type="password"
                          placeholder={t("enter-password")}
                          colorIcon="text-[#828282]"
                          className="dark:ring-hmc-base-blue"
                          suffix={<LockKeyhole className="text-[#828282] " />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
            <div className="flex flex-col gap-4 group">
              <Button className="text-white rounded-2xl bg-linear-to-l from-hmc-base-blue to-hmc-base-lightblue">
                {t("Login-button")}
              </Button>
              <p className="text-xs text-center">
                {t("sub-description")}{" "}
                <Link href="/sign-up" className="text-hmc-base group-hover:underline">
                  {t("Register-button")}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Image
          priority
          width={399}
          height={330}
          src="/assets/auth/signin-astronout.svg"
          alt="Sign In Background"
          className="hidden lg:block w-4/12 h-4/12"
        />
      </div>
    </div>
  );
};

export default LoginPage;
