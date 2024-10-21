"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { eventsService } from "@/services/events";
import EventCardV2 from "./components/EventCardV2";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { TechEvent } from "./types";
import { eventsData } from "./constants";

const EventListPage = () => {
  const t = useTranslations("EventsPage");
  const [events, setEvents] = useState<TechEvent[]>([]);
  const handleGetEvents = async () => {
    const res = await eventsService.getEvents("");
    setEvents(res.data);
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  return (
    <div className="container mx-auto px-5 py-28">
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
          {eventsData.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCardV2 data={event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventListPage;
