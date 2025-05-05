"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { eventsService } from "@/services/events";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/hooks/UseToast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { TechEvent } from "./types";
import EventCardV2 from "./components/EventCardV2";

const EventListPage = () => {
  const t = useTranslations("EventsPage");
  const { toast } = useToast();

  const [events, setEvents] = useState<TechEvent[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await eventsService.getEvents();
        setEvents(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      }
    };

    getEvents();
  }, []);

  return (
    <div className="container mx-auto px-5 pb-28 pt-24">
      <div className="w-full rounded-lg">
        <div className="h-16 flex flex-wrap gap-1 justify-between items-center">
          <div className="">
            <h1 className="text-hmc-base-blue text-xl sm:text-3xl font-semibold">{t("title")}</h1>
            <p className="text-gray-500 text-xs sm:text-base">{t("description")}</p>
          </div>
          <div className="w-full sm:w-auto">
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
          </div>
        </div>
      </div>
      <div className="pt-16 md:pt-8">
        {events ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className={`${event.id === 1 ? "lg:col-span-2" : "col-span-1"}`}
              >
                <EventCardV2 data={event} />
              </Link>
            ))}
            {/* {mockEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCardV2 data={event} />
            </Link>
          ))} */}
          </div>
        ) : (
          <div className="flex gap-4">
            <Skeleton className="w-full h-96" />
            <Skeleton className="w-full h-96" />
          </div>
        )}
      </div>
    </div>
  );
};
export default EventListPage;
