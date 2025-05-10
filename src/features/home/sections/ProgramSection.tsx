"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Image from "next/image";
import { motion } from "motion/react";
import { programData } from "../constants";
import { useTranslations } from "next-intl";

const ProgramSection = () => {
  const t = useTranslations("HomePage.section-program");
  const MotionCard = motion.create(Card, { forwardMotionProps: true });

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col gap-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-tertiary md:text-3xl text-2xl font-bold"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-3xl md:text-base text-sm text-slate-500 dark:text-slate-400 md:leading-7"
        >
          {t("description")}
        </motion.p>
      </div>

      {/* Our Prorams */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          show: {
            opacity: 1,
            x: 0,
            transition: {
              staggerChildren: 0.4,
              delayChildren: 0.2,
              duration: 0.4,
              ease: "easeOut",
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 grid-cols-1 gap-8"
      >
        {programData.map((data) => (
          <MotionCard
            key={data.id}
            variants={{
              hidden: { x: -40, opacity: 0 },
              show: {
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                },
              },
            }}
            whileHover={{ y: -5 }}
            className="hover:shadow-sm hover:shadow-white/40"
          >
            <CardHeader>
              <div className="flex justify-center w-full">
                <div className="space-y-4">
                  <Image
                    className="md:w-36 w-28 md:h-36 h-28 rounded-2xl"
                    src={data.icon}
                    alt={data.title}
                    width={140}
                    height={140}
                  />
                  <Image
                    className="md:w-36 w-28 rounded-2xl"
                    src="/assets/images/illustrations/shape-overlay.svg"
                    alt={data.title}
                    width={140}
                    height={140}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 mt-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-sky-100 dark:bg-sky-900 p-2 w-9 h-9 text-sm text-hmc-primary flex justify-center items-center rounded-lg cursor-default"
                >
                  {data.id}
                </motion.div>
                <h3 className="text-xl text-center font-semibold">{t(`programs.${data.id}.title`)}</h3>
                <p className="md:text-sm text-sm text-center text-slate-500 dark:text-slate-400 md:leading-6">
                  {t(`programs.${data.id}.description`)}
                </p>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
};

export default ProgramSection;
