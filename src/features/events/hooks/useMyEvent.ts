import { eventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";

export const useMyEvents = (page: number = 1, limit: number = 10) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getListMyEvents", page, limit],
    queryFn: async () => eventsService.getMyEvents(page, limit),
  });

  return {
    myEvents: data?.data || [],
    paginationMyEvents: data?.pagination,
    isLoading,
    error,
  };
};
