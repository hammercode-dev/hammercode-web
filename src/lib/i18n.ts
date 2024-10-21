/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./locales";

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
