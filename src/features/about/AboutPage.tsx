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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-5 space-y-4 text-justify"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 text-hmc-base-blue">{t("title")}</h1>
            <p className="text-sm text-gray-500">{t("description")}</p>
          </div>
          <p>
            <span className="text-hmc-primary font-semibold underline">Hammercode</span> {t("text.1")}
          </p>
          <ImagesList />
          <p>{t("text.2")}</p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Image
              src="/assets/images/about/meet-1.png"
              alt="meet"
              width={500}
              height={100}
              className="md:w-2/3 w-full h-auto rounded-lg shadow-lg"
            />
            <p className="md:w-2/3 w-full">{t("text.3")}</p>
          </div>
          <p>{t("text.3")}</p>
          <div className="flex gap-2">
            <Badge className="dark:text-white rounded-md bg-hmc-base-darkblue dark:bg-hmc-base-blue cursor-default">
              #SiapBerkarirDibidangIT
            </Badge>
            <Badge className="dark:text-white rounded-md bg-hmc-base-darkblue dark:bg-hmc-base-blue cursor-default">
              #HammerCode
            </Badge>
          </div>
        </motion.div>

        <div className="md:col-span-2 space-y-4">
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
