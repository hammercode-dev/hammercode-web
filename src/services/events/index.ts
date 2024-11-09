import { fetcher } from "../instance";
import { RegistrationForm } from "@/domains/Events";

export const eventsService = {
  getEvents() {
    return fetcher.get("public/events");
  },

  getEventById(id: string) {
    return fetcher.get(`public/events/${id}`);
  },

  registEvent(data: RegistrationForm) {
    return fetcher.post("public/events/registrations", data);
  },
};
