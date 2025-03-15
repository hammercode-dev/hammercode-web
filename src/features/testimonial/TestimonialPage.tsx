"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { testimonialData } from "../home/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import DetailTestimoni from "../home/components/DetailTestimoni";

const TestimonialPage = () => {
  const t = useTranslations("TestimonialPage");
  const [visibleCount, setVisibleCount] = useState(0); // 0 dulu biar shimmer
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // jumlah data awal sesuai ukuran layar
  const getInitialVisibleCount = () => {
    if (window.innerWidth >= 1024) return 6;
    if (window.innerWidth >= 768) return 4;
    return 2;
  };

  // shimmer tampilkan data awal
  useEffect(() => {
    const initialCount = getInitialVisibleCount();
    setTimeout(() => {
      setVisibleCount(initialCount);
      setIsLoading(false);
    }, 1000);
  }, []);

  // lazy load buat scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prevCount) => {
              const cols = getInitialVisibleCount();
              return Math.min(prevCount + cols, testimonialData.length);
            });
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 1 }
    );

    const loadMoreTrigger = document.getElementById("loadMoreTrigger");
    if (loadMoreTrigger) {
      observerRef.current?.observe(loadMoreTrigger);
    }

    return () => {
      if (observerRef.current) observerRef.current?.disconnect();
    };
  }, [visibleCount]);

  return (
    <>
      <div className="container mx-auto px-5 pt-24 pb-28">
        <div className="w-full">
          <h1 className="text-hmc-base-blue text-xl sm:text-3xl font-semibold">{t("title")}</h1>
          <p className="text-gray-500 text-xs sm:text-base">{t("description")}</p>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array(getInitialVisibleCount()) // shimmer jumlah sesuai grid
                  .fill(null)
                  .map((_, index) => <ShimmerCard key={index} />)
              : testimonialData.slice(0, visibleCount).map((data) => (
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

        {visibleCount < testimonialData.length && <div id="loadMoreTrigger" className="h-10"></div>}
      </div>
    </>
  );
};

const ShimmerCard = () => <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg p-4 h-96"></div>;

export default TestimonialPage;
