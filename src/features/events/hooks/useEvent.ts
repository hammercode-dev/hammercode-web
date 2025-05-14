import { useToast } from "@/components/hooks/UseToast";
import { eventsService } from "@/services/events";
import { useEffect, useState } from "react";
import { EventType } from "@/domains/Events";

export const useEventById = (eventId: string) => {
  const { toast } = useToast();
  const [event, setEvent] = useState<EventType>({} as EventType);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEvent = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getEventById(eventId);
        setEvent(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [eventId, toast]);

  return { event, isLoading };
};

export const useEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const res = await eventsService.getEvents();
        setEvents(res.data);
      } catch (err) {
        toast({ description: err instanceof Error ? err.message : "Something went wrong.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [toast]);

  return { events, isLoading };
};
