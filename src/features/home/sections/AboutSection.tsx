import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import Image from "next/image";

const AboutSection = () => {
  const t = useTranslations("HomePage.section-about");

  return (
    <div className="container mx-auto py-10 lg:py-40">
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative basis-1/2"
        >
          <Image
            className="absolute top-0 left-0 -z-10 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 lg:opacity-100"
            src="/assets/images/illustrations/shape-about1.svg"
            alt="about-hammercode"
            width={300}
            height={300}
          />
          <Image
            className="relative z-10 w-full rounded-lg transition-all duration-300 hover:scale-[1.02]"
            src="/assets/images/illustrations/about.webp"
            alt="about-hammercode"
            width={617}
            height={418}
          />
          <Image
            className="absolute right-0 bottom-0 -z-10 w-1/2 translate-y-1/2 opacity-40 lg:translate-x-1/2 lg:opacity-100"
            src="/assets/images/illustrations/shape-about2.svg"
            alt="about-hammercode"
            width={300}
            height={300}
          />
        </motion.div>
        <div className="basis-1/2 gap-4 lg:-mt-16">
          <div className="flex flex-col gap-4 lg:items-end">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-tertiary text-2xl font-bold md:text-3xl"
            >
              {t("title")}
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-hmc-primary text-3xl font-bold md:text-5xl md:leading-[60px] lg:text-right"
            >
              {t("sub-title")}
            </motion.h1>
            <div className="flex flex-col gap-3 lg:items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-sm text-slate-500 md:text-base md:leading-7 lg:text-right dark:text-slate-400"
              >
                {t.rich("description", {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Button
                  variant="tertiary"
                  asChild
                  className="group flex w-fit items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link href="/about">
                    {t("view-more-button")} <ArrowRight className="w-5 group-hover:animate-ping lg:w-6" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
