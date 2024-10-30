import { fetcher } from "../instance";

export const eventsService = {
  getEvents() {
    return fetcher.get("/public/events");
  },

  getEventById(id: string) {
    return fetcher.get(`/public/events/${id}`);
  },

  // bookEvent(data: any){
  //   return
  // }
};
