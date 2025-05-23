"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useToast } from "@/components/hooks/UseToast";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import DetailTestimoni from "../home/components/DetailTestimoni";
import { TestimonialType } from "../home/types";
import { homeService } from "@/services/home";
import { LoaderIcon } from "lucide-react";

const TestimonialPage = () => {
  const t = useTranslations("TestimonialPage");

  const { toast } = useToast();
  const [testimoni, setTestimoni] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTestimonials = async () => {
      setIsLoading(true);
      try {
        const res = await homeService.getAllTestimonial();
        setTestimoni(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    getTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderIcon className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-5 pt-24 pb-28">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-hmc-base-blue text-xl font-semibold sm:text-3xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xs text-gray-500 sm:text-base"
          >
            {t("description")}
          </motion.p>
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                staggerChildren: 0.2,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimoni?.map((data) => (
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    damping: 20,
                  },
                },
              }}
              whileHover={{ y: -5 }}
              key={data.id}
            >
              <Card className="shadow-md">
                <CardHeader className="pb-0">
                  <div className="flex w-full items-center gap-4">
                    <div className="space-y-4">
                      <Image
                        src={data.avatar_url}
                        alt={data.name}
                        width={140}
                        height={140}
                        loading="lazy"
                        className="w-28 rounded-full border-4 object-cover md:w-32 lg:w-20"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{data.name}</h3>
                      <p className="text-sm text-slate-400 dark:text-slate-400">{`${data.role}`}</p>
                      <p className="text-sm text-slate-400 dark:text-slate-400">
                        <Link className="font-semibold" href={data.company_url} target="_blank">
                          At {data.company_name}
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="line-clamp-4 cursor-pointer pt-3 text-sm leading-6 text-slate-400 dark:text-slate-400">
                          {data.quote}
                        </p>
                      </DialogTrigger>
                      <DetailTestimoni data={data} />
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default TestimonialPage;
