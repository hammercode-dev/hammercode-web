import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { locales } from "@/lib/locales";

type Props = {
  params: {
    locale: string;
  };
};

export default function RootPage({ params: { locale } }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  redirect("/en");
}
