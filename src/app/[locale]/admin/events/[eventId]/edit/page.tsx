interface EditEventPageProps {
  params: Promise<{ eventId: string }>;
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
  const p = await params;
  return (
    <div>
      <h1>Edit Event {p.eventId}</h1>
    </div>
  );
};

export default EditEventPage;
