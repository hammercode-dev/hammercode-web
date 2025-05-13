"use client";

import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";

import React from "react";
import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const t = useTranslations("AuthPage.ResetPasswordPage");
  const form = useForm();
  return (
    <div className="mx-auto px-5 pt-24 pb-28">
      <div className="flex items-center justify-center h-screem">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col shadow-lg w-xl gap-4 py-10 px-8 border rounded border-slate-300">
              <h1 className="text-3xl font-bold">{t("title")}</h1>
              <p className="">{t("instruction")}</p>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder={t("input-form")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder={t("input-form-confirm")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
              <Button type="submit" className="" size="lg">
                {t("button-continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
