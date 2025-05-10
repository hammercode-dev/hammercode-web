import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { RegistrationForm } from "@/domains/Events";
import { TechEvent } from "@/features/events/types";

export const eventsService = {
  getEvents(): Promise<HttpResponse<TechEvent[]>> {
    return fetcher.get("public/events");
  },

  getEventById(id: string): Promise<HttpResponse<TechEvent>> {
    return fetcher.get(`public/events/${id}`);
  },

  registerEvent(payload: RegistrationForm): Promise<HttpResponse<{ order_no: string }>> {
    return fetcher.post("public/events/registrations", payload);
  },
};
