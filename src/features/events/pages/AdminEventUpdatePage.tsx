import { EventFormType } from "@/domains/Events";
import EventForm from "../components/EventForm";

const AdminEventUpdatePage = () => {
  const handleSubmit = (data: EventFormType) => {
    // createMutation.mutate(data);
    console.log(data);
  };

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Edit event details quickly and easily.</p>
      </div>

      <EventForm onSubmit={handleSubmit} mode="edit" isLoading={false} />
    </section>
  );
};
export default AdminEventUpdatePage;
