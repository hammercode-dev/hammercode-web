"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Quote } from "lucide-react";
import { homeService } from "@/services/home";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/hooks/UseToast";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { Card, CardFooter, CardHeader } from "@/components/ui/Card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { TestimonialType } from "../types";
import DetailTestimoni from "../components/DetailTestimoni";

const TestimonialSection = () => {
  const t = useTranslations("HomePage.section-testimonial");
  const { toast } = useToast();

  const [testimoni, setTestimoni] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const getTestimonials = async () => {
      setIsLoading(true);
      try {
        const res = await homeService.getAllTestimonial();
        setTestimoni(res.data);
      } catch (err) {
        toast({ description: (err as Error)?.message || "Something went wrong.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    getTestimonials();
  }, []);

  return (
    <div className="container mx-auto space-y-8 py-10">
      <div className="flex flex-col space-y-2">
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
          className="text-sm text-slate-500 md:text-base dark:text-slate-400"
        >
          {t("description")}
        </motion.p>
      </div>

      {!isLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onHoverStart={() => setAutoPlay(false)}
          onHoverEnd={() => setAutoPlay(true)}
        >
          <Carousel opts={{ align: "center", loop: true }} className="w-full" isAutoPlay={autoPlay} isDots={true}>
            <CarouselContent className="space-x-4 sm:pr-4">
              {testimoni?.slice(0, 6).map((data) => (
                <CarouselItem key={data?.id} className="basis-[100%] md:basis-1/2">
                  <Card>
                    <CardHeader className="space-y-4">
                      <Quote size={24} className="text-foreground" />
                      <Dialog>
                        <DialogTrigger asChild>
                          <p className="line-clamp-3 cursor-pointer text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6 dark:text-slate-400">{`"${data?.quote}"`}</p>
                        </DialogTrigger>

                        <DetailTestimoni data={data} />
                      </Dialog>
                    </CardHeader>
                    <CardFooter className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                      <Image
                        src={data?.avatar_url}
                        alt={data?.name}
                        width={512}
                        height={512}
                        className="h-16 w-16 rounded-full border-2 object-cover lg:h-14 lg:w-14"
                      />
                      <div className="flex flex-col gap-1">
                        <h3>{data?.name}</h3>
                        <div className="text-xs text-slate-400 sm:text-sm dark:text-slate-400">
                          {data?.role} at{" "}
                          <Link href={data?.company_url} target="_blank" className="font-semibold">
                            {data?.company_name}
                          </Link>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      ) : (
        <div className="flex gap-4">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      )}

      {testimoni.length > 2 && (
        <div className="text-hmc-base-blue hover:text-hmc-base-blue/80 text-center italic">
          <Link href="testimonial">{t("showmore")}</Link>
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;
