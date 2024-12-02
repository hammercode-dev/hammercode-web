/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomePage } from "@/features/home";
import { locales } from "@/lib/locales";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

export default function Home({ params: { locale } }: Props) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  return <HomePage />;
}
