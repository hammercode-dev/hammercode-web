"use client";

import { EventFormType } from "@/domains/Events";
import EventForm from "../components/EventForm";
import { useGetDetailEventAdmin } from "../hooks/useEvent";
import Loader from "@/components/common/Loader";

const AdminEventUpdatePage = ({ eventId }: { eventId: string }) => {
  console.log("eventsss id", eventId);
  const { data, isLoading } = useGetDetailEventAdmin(eventId);

  console.log("dataaa", data);
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

      {isLoading ? (
        <Loader />
      ) : (
        <EventForm onSubmit={handleSubmit} mode="edit" isLoading={false} initialData={data?.data} />
      )}
    </section>
  );
};
export default AdminEventUpdatePage;
