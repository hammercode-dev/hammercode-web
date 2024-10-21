import { FC } from "react";
import Image from "next/image";
import { Clock, Pin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { useFormatDate } from "@/lib/utils";
import { TechEvent } from "../types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

const EventCardV2: FC<{ data: TechEvent }> = ({ data }) => {
  const { title, date_event, status, duration, location } = data;
  return (
    <Card className="flex flex-col size-full border rounded-lg shadow-md">
      <Image
        // TODO: replace src url from image_event
        src="/assets/images/events/pdd2024.webp"
        alt={title}
        width={540}
        height={240}
        className="object-cover object-center w-full h-40 rounded-t-lg md:h-64"
      />
      <CardContent className="px-4 pt-4 pb-0">
        <Badge className="mb-2" variant={`${status}`}>
          {status}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="text-base font-bold text-hmc-blue-600 line-clamp-2 sm:text-xl">{title}</h2>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 px-4 pt-3 pb-4 mt-auto">
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
