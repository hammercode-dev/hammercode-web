import { FC } from "react";
import { Clock, Pin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { useFormatDate } from "@/lib/utils";
import EventImage from "./EventImage";
import { TechEvent } from "../types";

const EventCardV2: FC<{ data: TechEvent }> = ({ data }) => {
  const { title, image_event, date_event, status, duration, location } = data;
  return (
    <Card className="flex size-full flex-col rounded-lg border shadow-md">
      <EventImage
        src={image_event}
        alt={title}
        width={540}
        height={240}
        className="h-40 w-full rounded-t-lg object-cover object-center md:h-64"
      />
      <CardContent className="px-4 pt-4 pb-0">
        <Badge className="mb-2" variant={`${status}`}>
          {status}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="text-hmc-blue-600 line-clamp-2 text-base font-bold sm:text-xl">{title}</h2>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-start gap-2 px-4 pt-3 pb-4">
        <p className="line-clamp-1">{useFormatDate(date_event)}</p>
        <div className="flex items-center gap-2">
          <Clock size={15} />
          <p className="text-sm">{duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <Pin size={15} />
          <p className="text-sm">{location}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
export default EventCardV2;
