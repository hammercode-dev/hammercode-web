import React from "react";
import { dataFooter } from "./constants";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

const Footer = () => {
  const date = new Date();
  const { resource, social_media, contact } = dataFooter;

  const t = useTranslations("Footer");

  return (
    <>
      <div className="space-y-8 border-t border-dashed">
        <div className="container mx-auto px-5 py-10">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
            <div className="h-24 w-28 bg-[url('/assets/icons/ic_hmc-full.svg')] bg-cover bg-center dark:bg-[url('/assets/icons/ic_hmc-full-dark.svg')]"></div>

            {/* Resources */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <h3 className="text-hmc-primary text-lg font-semibold">{t("resource.title")}</h3>
              <div className="flex flex-col items-center gap-1 md:items-start">
                {resource.data.map((data, index) => (
                  <Link
                    key={data.navigate_url}
                    href={data.navigate_url}
                    className="text-xs text-slate-600 hover:underline hover:opacity-80 md:text-sm dark:text-slate-400"
                  >
                    {t(`resource.data.${index}.name`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <h3 className="text-hmc-primary text-lg font-semibold">{t("social_media.title")}</h3>
              <div className="flex flex-col items-center gap-1 md:items-start">
                {social_media.data.map((data) => (
                  <Link
                    key={data.navigate_url}
                    href={data.navigate_url}
                    target="_blank"
                    className="text-xs text-slate-600 hover:underline hover:opacity-80 md:text-sm dark:text-slate-400"
                  >
                    {data.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <h3 className="text-hmc-primary text-lg font-semibold">{t("contact.title")}</h3>
              <div className="flex flex-col items-center gap-1 md:items-start">
                {contact.data.map((data, index) => (
                  <Button
                    key={index}
                    variant="link"
                    asChild
                    className="h-auto! justify-start p-0! text-xs font-normal text-slate-600 hover:opacity-80 md:text-sm dark:text-slate-400"
                  >
                    {data.navigate_url ? <Link href={data.navigate_url}>{data.value}</Link> : <p>{data.value}</p>}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-slate-950 p-8 dark:bg-slate-950">
        <p className="text-center text-xs text-white md:text-sm">
          {date.getFullYear()} © Penggiat Teknologi Palu Berkarya
        </p>
      </footer>
    </>
  );
};

export default Footer;
