"use client";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { useFormatDate } from "@/lib/utils";
import { CalendarRange, Clock, MapPin } from "lucide-react";
import { TechEvent } from "../types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/Avatar";

const EventInfo: FC<{ event: TechEvent; className?: string }> = ({ event, className }) => {
  const t = useTranslations("EventsPage");
  const { author, date_event, location, duration } = event;

  return (
    <div className={`${className} space-y-4`}>
      <div className="space-y-4">
        <div className="flex items-center h-4 gap-2">
          <CalendarRange className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="font-semibold text-sm capitalize text-slate-700 dark:text-slate-300">
            {useFormatDate(date_event)}
          </p>
        </div>
        <div className="flex items-center h-4 gap-2">
          <Clock className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="font-semibold text-sm capitalize text-slate-700 dark:text-slate-300">{duration}</p>
        </div>
        <div className="flex items-center h-4 gap-2">
          <MapPin className="size-4 text-slate-700 dark:text-slate-300" />
          <p className="font-semibold text-sm capitalize text-slate-700 dark:text-slate-300">{location}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-6 rounded-lg border border-slate-600 dark:border-slate-400">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={author} className="size-10 rounded-full" />
          <AvatarFallback className="p-2">CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("EventDetail.organized-by")}</h2>
          <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-200">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
