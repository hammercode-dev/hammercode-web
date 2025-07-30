"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { LoaderIcon } from "lucide-react";
import { useMyEvents } from "./hooks/useEvent";
import MyEventCard from "./components/MyEventCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { PaginationCustom } from "@/components/common/PaginationCustom";

interface MyEventPageProps {
  page?: number;
  perPage?: number;
}

const MyEventPage = ({ page = 1, perPage = 10 }: MyEventPageProps) => {
  const t = useTranslations("MyEventPage");
  const { myEvents, isLoading } = useMyEvents(page, perPage);

  const totalEvents = myEvents.length;
  const totalPages = Math.ceil(totalEvents / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const events = myEvents.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <LoaderIcon className="size-12 animate-spin" />
      </div>
    );
  }
  return (
    <section>
      <header className="my-8">
        <div className="flex h-16 flex-wrap items-center justify-between gap-1">
          <div>
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="w-full sm:w-auto"
          >
            <Select>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Workshop</SelectItem>
                  <SelectItem value="banana">Tech Talk</SelectItem>
                  <SelectItem value="blueberry">Learning</SelectItem>
                  <SelectItem value="grapes">Ngobar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </header>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              staggerChildren: 0.4,
              delayChildren: 0.2,
              ease: "easeOut",
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <div className="grid gap-6">
          {events.map((event) => (
            <motion.div
              key={event?.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                  },
                },
              }}
              whileHover={{ scale: 1.01 }}
            >
              {event && <MyEventCard data={event} />}
            </motion.div>
          ))}
        </div>
        <PaginationCustom currentPage={page} totalPages={totalPages} />
      </motion.div>
    </section>
  );
};

export default MyEventPage;
