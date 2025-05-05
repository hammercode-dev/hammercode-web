"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFormatPrice } from "@/lib/utils";
import { EventType } from "@/domains/Events";
import { eventsService } from "@/services/events";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/hooks/UseToast";
import TitleContainer from "@/components/ui/TitleContainer";
import EventInfo from "./components/EventInfo";
import EventImage from "./components/EventImage";
import EventBreadcrumbs from "./components/EventBreadcrumb";
import EventFormRegistration from "./components/EventFormRegistration";

interface EventDetailPageProp {
  eventId: string;
}

const EventDetailPage: FC<EventDetailPageProp> = ({ eventId }) => {
  const t = useTranslations("EventsPage");
  const { toast } = useToast();

  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await eventsService.getEventById(eventId);
        setEvent(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      }
    };

    getEvent();
  }, [eventId]);

  return (
    <div className="container py-24 mx-auto space-y-6">
      <div className="grid items-center grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="w-full rounded-lg">
            {event ? (
              <EventImage
                src={event?.image_event as string}
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="rounded-lg"
              />
            ) : (
              <Skeleton className="w-full h-24 rounded-lg sm:h-96" />
            )}
          </div>
          <EventBreadcrumbs />
          <div className="space-y-6">
            <h1 className="text-xl font-bold sm:text-3xl md:mt-8">{event?.title}</h1>
            {event ? (
              <EventInfo event={event} className="lg:hidden" />
            ) : (
              <Skeleton className="w-full h-10 rounded-lg" />
            )}
            <div className="space-y-4">
              <TitleContainer>
                <h2 className="font-semibold sm:text-xl">{t("EventDetail.desc-title")}</h2>
              </TitleContainer>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{event?.description}</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex items-center self-start justify-between w-full gap-4 rounded-lg bg-white dark:bg-slate-950 lg:bg-transparent lg:flex-col lg:justify-start lg:sticky lg:top-24 lg:px-4">
          <div className="hidden w-full p-4 space-y-6 border rounded-lg lg:block">
            {event ? <EventInfo event={event} /> : <Skeleton className="w-full h-4 rounded-lg" />}
          </div>
          <div className="flex flex-col w-full gap-4 px-6 py-4 border-t rounded-lg sm:border">
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold text-xs sm:text-sm dark:text-slate-200">
                {t("EventDetail.price-title")}
              </span>
              <p className="text-sm font-bold dark:text-slate-200">{useFormatPrice(event?.price)}</p>
            </div>
            <EventFormRegistration data={event} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
