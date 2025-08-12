"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NotFoundPage = () => {
  const t = useTranslations("Layout.not_found");
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      <Image
        src="/assets/images/illustrations/404.gif"
        alt="not-found"
        width={320}
        height={320}
        className="w-xl min-w-72 object-contain"
      />
      <div className="-mt-14 space-y-4 md:-mt-24">
        <h1 className="text-muted-foreground text-xl font-bold tracking-tight lg:text-3xl">{t("heading")}</h1>
        <p className="text-muted-foreground text-lg">{t("sub-heading")}</p>
        <div className="pt-4">
          <Link
            href="/"
            className="bg-hmc-base-darkblue hover:bg-hmc-darkblue-blue/90 cursor-pointer rounded-lg p-3 text-white"
          >
            {t("btn")}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
