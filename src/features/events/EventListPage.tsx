"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Link from "next/link";
import { eventsService } from "@/services/events";
import { useToast } from "@/components/hooks/UseToast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { TechEvent } from "./types";
import EventCardV2 from "./components/EventCardV2";
import { LoaderIcon } from "lucide-react";

const EventListPage = () => {
  const t = useTranslations("EventsPage");
  const { toast } = useToast();

  const [events, setEvents] = useState<TechEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getEvents();
        setEvents(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <LoaderIcon className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 pb-28 pt-24">
      <div className="w-full rounded-lg">
        <div className="h-16 flex flex-wrap gap-1 justify-between items-center">
          <div>
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
      </div>
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
        className="pt-16 md:pt-8"
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
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
              whileHover={{ y: -5 }}
              className={`${event.id === 1 ? "lg:col-span-2" : "col-span-1"}`}
            >
              <Link href={`/events/${event.id}`}>
                <EventCardV2 data={event} />
              </Link>
            </motion.div>
          ))}
          {/* {mockEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCardV2 data={event} />
            </Link>
          ))} */}
        </div>
      </motion.div>
    </div>
  );
};
export default EventListPage;
