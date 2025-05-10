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
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin size-12" />
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
            className="text-hmc-base-blue text-xl sm:text-3xl font-semibold"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-gray-500 text-xs sm:text-base"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
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
              <Card>
                <CardHeader>
                  <div className="flex justify-center w-full">
                    <div className="space-y-4">
                      <Image
                        src={data.avatar_url}
                        alt={data.name}
                        width={140}
                        height={140}
                        loading="lazy"
                        className="w-28 md:w-32 lg:w-36 rounded-full object-cover border-4"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="font-semibold">{data.name}</h3>
                    <p className="text-center text-slate-400 dark:text-slate-400 text-sm">
                      {`${data.role} at `}
                      <Link className="font-semibold" href={data.company_url} target="_blank">
                        {data.company_name}
                      </Link>
                    </p>
                    <Image
                      className="mt-4 self-start text-white"
                      src="/assets/icons/ic_qoute.svg"
                      height={24}
                      width={24}
                      alt="qoute"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="cursor-pointer text-slate-400 dark:text-slate-400 text-sm leading-6 pt-3 line-clamp-4">
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
