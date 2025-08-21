import { EventType } from "@/domains/Events";
import { eventsService } from "@/services/events";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useMyEvents = (page: number = 1, limit: number = 10) => {
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    getEvents();
  }, [toast]);

  return { myEvents, isLoading };
};
