import { EventDetailPage } from "@/features/events";

const EventsDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return <EventDetailPage eventId={params.id} />;
};

export default EventsDetail;
