"use client";

import { EventFormType } from "@/domains/Events";
import EventForm from "../components/EventForm";
import { useCreateEvent } from "../hooks/useEvent";
import { useTranslations } from "next-intl";

const AdminEventsCreatePage = () => {
  const t = useTranslations();
  const { createMutation, isLoading } = useCreateEvent(t);

  const handleSubmit = (data: EventFormType) => {
    createMutation.mutate(data);
  };

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">Add a new event or workshop</p>
      </div>

      <EventForm onSubmit={handleSubmit} mode="create" isLoading={isLoading} />
    </section>
  );
};

export default AdminEventsCreatePage;
