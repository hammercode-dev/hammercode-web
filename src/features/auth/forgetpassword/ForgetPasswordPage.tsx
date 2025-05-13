"use client";

import { Button } from "@/components/ui/Button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import React from "react";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";

const ForgetPasswordPage = () => {
  const form = useForm();
  const t = useTranslations("AuthPage.ForgetPasswordPage");

  return (
    <div className="mx-auto px-5 pt-24 pb-28">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-xl gap-4 py-10 px-8 border rounded border-slate-300">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="inline truncate">{t("instruction")}</p>
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder={t("input-form")} {...field} />
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
  );
};

export default ForgetPasswordPage;
