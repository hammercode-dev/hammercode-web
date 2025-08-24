import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Sora } from "next/font/google";
import { locales } from "@/lib/locales";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/Toaster";
import { AuthProvider } from "@/components/provider/AuthProvider";
import { cookies } from "next/headers";
import { AuthJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import TanstackProvider from "@/components/provider/TanstackProvider";
const sora = Sora({ subsets: ["latin"] });

type Props = {
  params: Promise<{
    locale: "en" | "id";
  }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleRootLayout(props: Readonly<Props>) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);

  // Get authenticated user info
  // This data is retrieved on server context
  // Then we passed it into auth provider
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const payload: AuthJwtPayload | undefined = token?.value ? jwtDecode<AuthJwtPayload>(token.value) : undefined;

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sora.className}`}>
        <NextIntlClientProvider messages={messages}>
          <TanstackProvider>
            <AuthProvider payload={payload}>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </AuthProvider>
          </TanstackProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
