"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { TablePagination } from "@/components/common/TableData/TablePagination";
import { useMyEvents } from "../hooks/useMyEvent";
import MyEventCard from "../components/MyEventCard";
import { EVENTS_TYPE } from "@/constants/event";
import Loader from "@/components/common/Loader";
import { UserEventType } from "@/domains/Events";
import { NotFoundData } from "@/components/common/NotFoundData";
import { useQueryParams } from "@/hooks";

const UserEventPage = () => {
  const t = useTranslations("MyEventPage");
  const { getNumberParam } = useQueryParams();
  const page = getNumberParam("page", 1);
  const limit = getNumberParam("limit", 5);

  const [typeActive, setTypeActive] = useState("all");
  const { myEvents, isLoading, paginationMyEvents } = useMyEvents(page, limit, typeActive);

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
            <Select onValueChange={setTypeActive} defaultValue="all">
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="All Type Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Type Event</SelectItem>
                  {EVENTS_TYPE.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </header>
      {isLoading ? (
        <Loader />
      ) : myEvents.length === 0 ? (
        <NotFoundData />
      ) : (
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
            {myEvents.map((event: UserEventType) => (
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
          {(paginationMyEvents?.total_pages || 0) > 1 && (
            <div className="mt-8 flex justify-center">
              <TablePagination
                currentPage={paginationMyEvents?.page}
                totalPages={paginationMyEvents?.total_pages}
                itemsPerPage={limit}
              />
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default UserEventPage;
