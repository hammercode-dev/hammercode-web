import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import { EventType, RegistrationForm } from "@/domains/Events";

export const eventsService = {
  /**
   * API to get all events
   */
  getEvents(): Promise<HttpResponse<EventType[]>> {
    return fetcher.get("public/events");
  },

  /**
   * API to get detail event by id event
   */
  getEventById(id: string): Promise<HttpResponse<EventType>> {
    return fetcher.get(`public/events/${id}`);
  },

  /**
   * API to get register event user
   */
  registerEvent(payload: RegistrationForm): Promise<HttpResponse<{ order_no: string }>> {
    return fetcher.post("/events/registrations", payload);
  },

  /**
   * API to retrieve the list of events owned by the current user.
   */
  getMyEvents(page: number = 1, limit: number = 10): Promise<HttpResponse<EventType[]>> {
    return fetcher.get(`/events/registrations?page=${page}&limit=${limit}`);
  },
};
