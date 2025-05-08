"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
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

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const res = await homeService.getAllTestimonial();
        setTestimoni(res.data);
      } catch (err) {
        toast({ description: (err as Error).message || "Something went wrong.", variant: "destructive" });
      }
    };

    getTestimonials();
  }, []);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-tertiary md:text-3xl text-2xl font-bold">{t("title")}</h2>
        <p className="md:text-base text-sm text-slate-500 dark:text-slate-400">{t("description")}</p>
      </div>

      {testimoni ? (
        <>
          <Carousel className="w-full" isDots={true}>
            <CarouselContent className="space-x-4 sm:pr-4">
              {testimoni?.slice(0, 6).map((data) => (
                <CarouselItem key={data?.id} className="md:basis-1/2 basis-[100%]">
                  <Card>
                    <CardHeader className="space-y-4">
                      <Image src="/assets/icons/ic_qoute.svg" alt="quote" width={24} height={24} />
                      <Dialog>
                        <DialogTrigger asChild>
                          <p className="sm:text-sm text-xs text-slate-500 dark:text-slate-400 sm:leading-6 leading-5 line-clamp-3 cursor-pointer">{`"${data?.quote}"`}</p>
                        </DialogTrigger>

                        <DetailTestimoni data={data} />
                      </Dialog>
                    </CardHeader>
                    <CardFooter className="flex md:flex-row flex-col md:items-center items-start gap-2">
                      <Image
                        src={data?.avatar_url}
                        alt={data?.name}
                        width={512}
                        height={512}
                        className="lg:w-14 w-16 lg:h-14 h-16 object-cover border-2 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <h3>{data?.name}</h3>
                        <div className="sm:text-sm text-xs text-slate-400 dark:text-slate-400">
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
        </>
      ) : (
        <div className="flex gap-4">
          <Skeleton className="w-full h-72" />
          <Skeleton className="w-full h-72" />
        </div>
      )}

      {testimoni.length > 0 && (
        <div className="text-center text-hmc-base-blue italic hover:text-hmc-base-blue/80">
          <Link href="testimonial">{t("showmore")}</Link>
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;
