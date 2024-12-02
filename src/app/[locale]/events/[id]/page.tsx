import { EventDetailPage } from "@/features/events";

const EventsDetail = ({ params }: { params: { id: string } }) => {
  return <EventDetailPage eventId={params.id} />;
};

export default EventsDetail;
