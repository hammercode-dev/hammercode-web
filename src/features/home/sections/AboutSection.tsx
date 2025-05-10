import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import Image from "next/image";

const AboutSection = () => {
  const t = useTranslations("HomePage.section-about");

  return (
    <div className="container mx-auto lg:py-40 py-10">
      <div className="flex lg:flex-row flex-col-reverse lg:gap-16 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="basis-1/2 relative"
        >
          <Image
            className="w-1/2 absolute top-0 -translate-y-1/2 left-0 -translate-x-1/2 -z-10 lg:opacity-100 opacity-40"
            src="/assets/images/illustrations/shape-about1.svg"
            alt="about-hammercode"
            width={300}
            height={300}
          />
          <Image
            className="w-full relative z-10 rounded-lg transition-all duration-300 hover:scale-[1.02]"
            src="/assets/images/illustrations/about.webp"
            alt="about-hammercode"
            width={617}
            height={418}
          />
          <Image
            className="w-1/2 absolute bottom-0 translate-y-1/2 right-0 lg:translate-x-1/2 -z-10 lg:opacity-100 opacity-40"
            src="/assets/images/illustrations/shape-about2.svg"
            alt="about-hammercode"
            width={300}
            height={300}
          />
        </motion.div>
        <div className="basis-1/2 gap-4 lg:-mt-16">
          <div className="flex flex-col lg:items-end gap-4">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-tertiary md:text-3xl text-2xl font-bold"
            >
              {t("title")}
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-hmc-primary lg:text-right md:text-5xl text-3xl font-bold md:leading-[60px]"
            >
              {t("sub-title")}
            </motion.h1>
            <div className="flex flex-col lg:items-end gap-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="md:text-base lg:text-right text-sm text-slate-500 dark:text-slate-400 md:leading-7"
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
                  className="group flex items-center gap-2 w-fit transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link href="/about">
                    {t("view-more-button")} <ArrowRight className="lg:w-6 w-5 group-hover:animate-ping" />
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
