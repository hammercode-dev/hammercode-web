import { FC } from "react";
import Image from "next/image";
import { Clock, Pin } from "lucide-react";

import Badge from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { TechEvent } from "../types";

const EventCard: FC<{ data: TechEvent }> = ({ data }) => {
  const { id, title, date, status, duration, location, image_event } = data;
  return (
    <Card key={id} className="flex min-h-28 rounded-lg border shadow-md">
      <Image
        src={image_event}
        alt={title}
        width={150}
        height={150}
        className="min-h-36 w-64 rounded-l-lg object-cover"
      />
      <div className="px-4 py-6">
        <CardContent className="pb-0">
          <Badge className="mb-2" variant={`${status}`}>
            {status}
          </Badge>
          <h2 className="text-hmc-blue-600 text-xl font-bold">{title}</h2>
          <p className="text-gray-800">{date}</p>
        </CardContent>
        <CardFooter className="mt-2 flex gap-2 pb-2 text-gray-500">
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
