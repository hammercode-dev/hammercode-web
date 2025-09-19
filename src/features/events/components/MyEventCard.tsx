import Image from "next/image";
import { Clock, Pin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { UserEventType } from "@/domains/Events";
import { formatDateEvent } from "@/lib/format";

const MyEventCard = ({ data }: { data: UserEventType }) => {
  const { order_no, status } = data;

  return (
    <section>
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-xs"
            style={{
              backgroundImage: `url(${data.event_detail.image_event ?? "/assets/images/events/fallbackImage.webp"})`,
            }}
          />
          <Image
            alt={`Event ${order_no}`}
            src={data.event_detail.image_event ?? "/assets/images/events/fallbackImage.webp"}
            width={540}
            height={240}
            className="relative z-10 object-cover object-center"
          />
        </div>
        <Card className="flex size-full flex-col rounded-lg border shadow-md lg:col-span-3">
          <CardContent className="px-4 pt-4 pb-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">#{order_no}</span>
              <Badge variant={status}>{status}</Badge>
            </div>

            <h2 className="text-hmc-blue-600 line-clamp-2 text-base font-bold sm:text-xl">{data.event_detail.title}</h2>
          </CardContent>
          <CardFooter className="mt-auto flex flex-col items-start gap-2 px-4 pt-3 pb-4">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-gray-500" />
              <p className="text-sm">{formatDateEvent(data.event_detail.date as string) || "-"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Pin size={15} className="text-gray-500" />
              <p className="line-clamp-1 text-sm">{data.event_detail.location || "-"}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default MyEventCard;
