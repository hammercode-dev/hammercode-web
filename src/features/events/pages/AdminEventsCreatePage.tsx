"use client";

import { EventFormType } from "@/domains/Events";
import EventForm from "../components/EventForm";

const AdminEventsCreatePage = () => {
  const handleSubmit = (data: EventFormType) => {
    console.log(data);
  };

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">Add a new event or workshop</p>
      </div>

      <EventForm onSubmit={handleSubmit} mode="create" />
    </section>
  );
};

export default AdminEventsCreatePage;
