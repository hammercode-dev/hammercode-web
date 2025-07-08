"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";

import { CalendarRange, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/Avatar";
import { EventType } from "@/domains/Events";
import { useFormatDate } from "@/lib/format";

const EventInfo: FC<{ event: EventType; className?: string }> = ({ event, className }) => {
  const t = useTranslations("EventsPage");

  return (
    <div className={`${className} space-y-4`}>
      <div className="space-y-4">
        <div className="flex h-4 items-center gap-2">
          <CalendarRange className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="text-sm font-semibold text-slate-700 capitalize dark:text-slate-300">
            {useFormatDate(event?.reservation_start_date)}
          </p>
        </div>
        <div className="flex h-4 items-center gap-2">
          <Clock className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="text-sm font-semibold text-slate-700 capitalize dark:text-slate-300">{event?.duration}</p>
        </div>
        <div className="flex h-4 items-center gap-2">
          <MapPin className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="text-sm font-semibold text-slate-700 capitalize dark:text-slate-300">{event?.location}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border p-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={event?.author} className="size-10 rounded-full" />
          <AvatarFallback className="p-2">CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("EventDetail.organized-by")}</h2>
          <span className="text-xs font-black text-slate-700 uppercase dark:text-slate-200">{event?.author}</span>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
