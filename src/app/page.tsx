// import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/locales";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootPage(props: Props) {
  const params = await props.params;

  const { locale } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
}
