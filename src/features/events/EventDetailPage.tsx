"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useFormatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import TitleContainer from "@/components/ui/TitleContainer";
import EventInfo from "./components/EventInfo";
import EventImage from "./components/EventImage";
import EventBreadcrumbs from "./components/EventBreadcrumb";
import EventFormRegistration from "./components/EventFormRegistration";
import { useEventById } from "./hooks/useEvent";

interface EventDetailPageProp {
  eventId: string;
}

const EventDetailPage: FC<EventDetailPageProp> = ({ eventId }) => {
  const t = useTranslations("EventsPage");
  const { event, isLoading } = useEventById(eventId);

  return (
    <div className="container mx-auto space-y-6 py-24">
      <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="w-full rounded-lg">
            {!isLoading ? (
              <EventImage
                src={event?.image_event as string}
                alt="Banner"
                width={1000}
                height={500}
                priority
                className="rounded-lg"
              />
            ) : (
              <Skeleton className="h-24 w-full rounded-lg sm:h-96" />
            )}
          </div>
          <EventBreadcrumbs />
          <div className="space-y-6">
            <h1 className="text-xl font-bold sm:text-3xl md:mt-8">{event?.title}</h1>
            {!isLoading ? (
              <EventInfo event={event} className="lg:hidden" />
            ) : (
              <Skeleton className="h-10 w-full rounded-lg" />
            )}
            <div className="space-y-4">
              <TitleContainer>
                <h2 className="font-semibold sm:text-xl">{t("EventDetail.desc-title")}</h2>
              </TitleContainer>
              <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">{event?.description}</p>
            </div>
          </div>
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex w-full items-center justify-between gap-4 self-start rounded-lg bg-white lg:sticky lg:top-24 lg:flex-col lg:justify-start lg:bg-transparent lg:px-4 dark:bg-slate-950">
          <div className="hidden w-full space-y-6 rounded-lg border p-4 lg:block">
            {!isLoading ? <EventInfo event={event} /> : <Skeleton className="h-4 w-full rounded-lg" />}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-lg border-t px-6 py-4 sm:border">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-semibold sm:text-sm dark:text-slate-200">
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
