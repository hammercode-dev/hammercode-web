"use client";

import { EventFormType } from "@/domains/Events";
import EventForm from "../components/EventForm";
import { useGetDetailEventAdmin, useUpdateEvent } from "../hooks/useEvent";
import Loader from "@/components/common/Loader";
import { useTranslations } from "next-intl";

const AdminEventUpdatePage = ({ eventId }: { eventId: string }) => {
  console.log("eventsss id", eventId);
  const t = useTranslations();
  const { data, isLoading } = useGetDetailEventAdmin(eventId);
  const { updateEvent, isLoading: loadingUpdate } = useUpdateEvent(t, eventId);

  const handleSubmit = (data: EventFormType) => {
    updateEvent(data);
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
        <EventForm onSubmit={handleSubmit} mode="edit" isLoading={loadingUpdate} initialData={data?.data} />
      )}
    </section>
  );
};
export default AdminEventUpdatePage;
