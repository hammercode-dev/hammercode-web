import { PublicEventDetailPage } from "@/features/events/pages";

const EventsDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return <PublicEventDetailPage eventId={params.id} />;
};

export default EventsDetail;
