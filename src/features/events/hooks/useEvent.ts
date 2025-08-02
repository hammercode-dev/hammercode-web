import { useEffect, useState } from "react";
import { toast } from "sonner";
import { eventsService } from "@/services/events";
import { EventType } from "@/domains/Events";

export const useEventById = (eventId: string) => {
  const [event, setEvent] = useState<EventType>({} as EventType);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEvent = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getEventById(eventId);
        setEvent(res.data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [eventId, toast]);

  return { event, isLoading };
};

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getEvents();
        setEvents(res.data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [toast]);

  return { events, isLoading };
};

export const useMyEvents = (page: number = 1, limit: number = 10) => {
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getMyEvents(page, limit);
        setMyEvents(res.data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [toast]);

  return { myEvents, isLoading };
};
