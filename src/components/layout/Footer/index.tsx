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
          <div className="flex md:flex-row flex-col justify-between md:items-start items-center gap-10">
            <div className="w-28 h-24 bg-[url('/assets/icons/ic_hmc-full.svg')] dark:bg-[url('/assets/icons/ic_hmc-full-dark.svg')] bg-cover bg-center"></div>

            {/* Resources */}
            <div className="flex flex-col md:items-start items-center gap-3">
              <h3 className="text-lg text-hmc-primary font-semibold">{t("resource.title")}</h3>
              <div className="flex flex-col md:items-start items-center gap-1">
                {resource.data.map((data, index) => (
                  <Link
                    key={data.navigate_url}
                    href={data.navigate_url}
                    className="md:text-sm text-xs text-slate-600 dark:text-slate-400 hover:opacity-80 hover:underline"
                  >
                    {t(`resource.data.${index}.name`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col md:items-start items-center gap-3">
              <h3 className="text-lg text-hmc-primary font-semibold">{t("social_media.title")}</h3>
              <div className="flex flex-col md:items-start items-center gap-1">
                {social_media.data.map((data) => (
                  <Link
                    key={data.navigate_url}
                    href={data.navigate_url}
                    target="_blank"
                    className="md:text-sm text-xs text-slate-600 dark:text-slate-400 hover:opacity-80 hover:underline"
                  >
                    {data.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col md:items-start items-center gap-3">
              <h3 className="text-lg text-hmc-primary font-semibold">{t("contact.title")}</h3>
              <div className="flex flex-col md:items-start items-center gap-1">
                {contact.data.map((data, index) => (
                  <Button
                    key={index}
                    variant="link"
                    asChild
                    className="!h-auto !p-0 md:text-sm justify-start text-xs font-normal text-slate-600 dark:text-slate-400 hover:opacity-80"
                  >
                    {data.navigate_url ? <Link href={data.navigate_url}>{data.value}</Link> : <p>{data.value}</p>}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-slate-950 dark:bg-slate-950 p-8">
        <p className="md:text-sm text-xs text-center text-white">
          {date.getFullYear()} © Penggiat Teknologi Palu Berkarya
        </p>
      </footer>
    </>
  );
};

export default Footer;
