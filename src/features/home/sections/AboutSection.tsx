import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutSection = () => {
  const t = useTranslations("HomePage.section-about");

  return (
    <div className="container mx-auto lg:py-40 py-10">
      <div className="flex lg:flex-row flex-col-reverse lg:gap-16 gap-10">
        <div className="basis-1/2 relative">
          <Image
            className="w-1/2 absolute top-0 -translate-y-1/2 left-0 -translate-x-1/2 -z-10 lg:opacity-100 opacity-40"
            src="/assets/images/illustrations/shape-about1.svg"
            alt="about-hammercode"
            width={500}
            height={500}
          />
          <Image
            className="w-full relative z-10 rounded-lg"
            src="/assets/images/illustrations/about.webp"
            alt="about-hammercode"
            width={1000}
            height={500}
          />
          <Image
            className="w-1/2 absolute bottom-0 translate-y-1/2 right-0 lg:translate-x-1/2 -z-10 lg:opacity-100 opacity-40"
            src="/assets/images/illustrations/shape-about2.svg"
            alt="about-hammercode"
            width={500}
            height={500}
          />
        </div>
        <div className="basis-1/2 gap-4 lg:-mt-16">
          <div className="flex flex-col lg:items-end gap-4">
            <h2 className="text-tertiary md:text-3xl text-2xl font-bold">{t("title")}</h2>
            <h1 className="text-hmc-primary lg:text-right md:text-5xl text-3xl font-bold md:leading-[60px]">
              {t("sub-title")}
            </h1>
            <div className="flex flex-col lg:items-end gap-3">
              <p className="md:text-base lg:text-right text-sm text-slate-500 dark:text-slate-400 md:leading-7">
                {t.rich("description", {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </p>
              <Button variant="tertiary" asChild className="flex items-center gap-2 w-fit">
                <Link href="/about">
                  {t("view-more-button")} <ArrowRight className="lg:w-6 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
