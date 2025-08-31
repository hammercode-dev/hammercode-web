import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/services/events";

export const useEventById = (eventId: string) => {
  return useQuery({
    queryKey: ["getEventById", eventId],
    queryFn: async () => {
      const response = await eventsService.getEventById(eventId);
      return response.data;
    },
    enabled: !!eventId,
  });
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await eventsService.getEvents();
      return response.data;
    },
  });
};

export const useMyEvents = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["myEvents", page, limit],
    queryFn: async () => {
      const response = await eventsService.getMyEvents(page, limit);
      return response.data;
    },
  });
};

export const useEventsAdmin = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["eventsAdmin", page, limit, search],
    queryFn: async () => {
      const response = await eventsService.getListEventsAdmin(page, limit, undefined, search);
      return response;
    },
  });
};
