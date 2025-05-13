"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import ImagesList from "./components/ImagesList";
import OurFounder from "./components/OurFounder";
import OurProgram from "./components/OurProgram";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="container mx-auto px-5 py-28">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4 text-justify md:col-span-5"
        >
          <div>
            <h1 className="text-hmc-base-blue mb-2 text-3xl font-bold">{t("title")}</h1>
            <p className="text-sm text-gray-500">{t("description")}</p>
          </div>
          <p>
            <span className="text-hmc-primary font-semibold underline">Hammercode</span> {t("text.1")}
          </p>
          <ImagesList />
          <p>{t("text.2")}</p>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Image
              src="/assets/images/about/meet-1.png"
              alt="meet"
              width={500}
              height={100}
              className="h-auto w-full rounded-lg shadow-lg md:w-2/3"
            />
            <p className="w-full md:w-2/3">{t("text.3")}</p>
          </div>
          <p>{t("text.3")}</p>
          <div className="flex gap-2">
            <Badge className="bg-hmc-base-darkblue dark:bg-hmc-base-blue cursor-default rounded-md dark:text-white">
              #SiapBerkarirDibidangIT
            </Badge>
            <Badge className="bg-hmc-base-darkblue dark:bg-hmc-base-blue cursor-default rounded-md dark:text-white">
              #HammerCode
            </Badge>
          </div>
        </motion.div>

        <div className="space-y-4 md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <OurFounder />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <OurProgram />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
