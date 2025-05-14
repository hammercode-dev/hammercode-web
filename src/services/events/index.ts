import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { EventType, RegistrationForm } from "@/domains/Events";

export const eventsService = {
  getEvents(): Promise<HttpResponse<EventType[]>> {
    return fetcher.get("public/events");
  },

  getEventById(id: string): Promise<HttpResponse<EventType>> {
    return fetcher.get(`public/events/${id}`);
  },

  registerEvent(payload: RegistrationForm): Promise<HttpResponse<{ order_no: string }>> {
    return fetcher.post("public/events/registrations", payload);
  },
};
