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
    <div className="container mx-auto space-y-8 py-10">
      <div className="flex flex-col gap-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-tertiary text-2xl font-bold md:text-3xl"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-3xl text-sm text-slate-500 md:text-base md:leading-7 dark:text-slate-400"
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
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
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
              <div className="flex w-full justify-center">
                <div className="space-y-4">
                  <Image
                    className="h-28 w-28 rounded-2xl md:h-36 md:w-36"
                    src={data.icon}
                    alt={data.title}
                    width={140}
                    height={140}
                  />
                  <Image
                    className="w-28 rounded-2xl md:w-36"
                    src="/assets/images/illustrations/shape-overlay.svg"
                    alt={data.title}
                    width={140}
                    height={140}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-hmc-primary flex h-9 w-9 cursor-default items-center justify-center rounded-lg bg-sky-100 p-2 text-sm dark:bg-sky-900"
                >
                  {data.id}
                </motion.div>
                <h3 className="text-center text-xl font-semibold">{t(`programs.${data.id}.title`)}</h3>
                <p className="text-center text-sm text-slate-500 md:text-sm md:leading-6 dark:text-slate-400">
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
