import { FC } from "react";
import Image from "next/image";
import { Clock, Pin } from "lucide-react";

import Badge from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { TechEvent } from "../types";

const EventCard: FC<{ data: TechEvent }> = ({ data }) => {
  const { id, title, date_event, status, duration, location, image_event } = data;
  return (
    <Card key={id} className="border rounded-lg shadow-md flex min-h-28">
      <Image
        src={image_event}
        alt={title}
        width={150}
        height={150}
        className="rounded-l-lg object-cover w-64 min-h-36"
      />
      <div className="px-4 py-6">
        <CardContent className="pb-0">
          <Badge className="mb-2" variant={`${status}`}>
            {status}
          </Badge>
          <h2 className="text-xl font-bold text-hmc-blue-600">{title}</h2>
          <p className="text-gray-800">{date_event}</p>
        </CardContent>
        <CardFooter className="flex gap-2 text-gray-500 mt-2 pb-2">
          <div className="flex items-center gap-2">
            <Clock size={15} />
            <p className="text-sm">{duration}</p>
          </div>
          <div className="flex items-center gap-2">
            <Pin size={15} />
            <p className="text-sm">{location}</p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
export default EventCard;
