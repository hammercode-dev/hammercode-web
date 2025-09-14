import { AdminEventUpdatePage } from "@/features/events/pages";

const EditEventPage = async (props: { params: Promise<{ eventId: string }> }) => {
  const params = await props.params;

  return <AdminEventUpdatePage eventId={params.eventId} />;
};
export default EditEventPage;
