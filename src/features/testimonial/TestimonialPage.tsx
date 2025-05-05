"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/hooks/UseToast";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import DetailTestimoni from "../home/components/DetailTestimoni";
import { TestimonialType } from "../home/types";
import { homeService } from "@/services/home";
import { Skeleton } from "@/components/ui/Skeleton";

const TestimonialPage = () => {
  const t = useTranslations("TestimonialPage");

  const { toast } = useToast();
  const [testimoni, setTestimoni] = useState<TestimonialType[]>([]);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const res = await homeService.getAllTestimonial();
        setTestimoni(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      }
    };

    getTestimonials();
  }, []);

  return (
    <>
      <div className="container mx-auto px-5 pt-24 pb-28">
        <div className="w-full">
          <h1 className="text-hmc-base-blue text-xl sm:text-3xl font-semibold">{t("title")}</h1>
          <p className="text-gray-500 text-xs sm:text-base">{t("description")}</p>
        </div>
        <div className="mt-6">
          {testimoni ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimoni?.map((data) => (
                <Card key={data.id}>
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
              ))}
            </div>
          ) : (
            <div className="flex gap-4">
              <Skeleton className="w-full h-80" />
              <Skeleton className="w-full h-80" />
              <Skeleton className="w-full h-80" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestimonialPage;
