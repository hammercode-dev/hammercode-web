"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { testimonialData } from "../home/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import DetailTestimoni from "../home/components/DetailTestimoni";

const TestimonialPage = () => {
  const t = useTranslations("TestimonialPage");

  return (
    <>
      <div className="container mx-auto px-5 pt-24 pb-28">
        <div className="w-full">
          <h1 className="text-hmc-base-blue text-xl sm:text-3xl font-semibold">{t("title")}</h1>
          <p className="text-gray-500 text-xs sm:text-base">{t("description")}</p>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.map((data) => (
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
                    <p className="text-center text-slate-400 dark:bg-slate-400 text-sm">
                      {`${data.role} at `}
                      <Link className="font-semibold" href={data.company_url} target="_blank">
                        {data.company_name}
                      </Link>
                    </p>
                    <Image
                      className="mt-4 self-start"
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
        </div>
      </div>
    </>
  );
};

export default TestimonialPage;
