"use client";

import { useEvents } from "@/features/events/hooks/useEvent";
import Link from "next/link";

const EventListPage = () => {
  const { events, isLoading } = useEvents();
  return (
    <div>
      <h1>Event List</h1>
      {isLoading && <p>Fetching events...</p>}
      <ul>
        {events.map((ev) => (
          <li key={ev.id}>
            {ev.title} <Link href={`/admin/events/${ev.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
