import { eventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useMyEvents = (page: number, limit: number, type: string) => {
  const typeMemo = useMemo(() => {
    return type === "all" ? "" : type;
  }, [type]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getListMyEvents", page, limit, type],
    queryFn: async () => eventsService.getMyEvents(page, limit, typeMemo),
    staleTime: 0,
    refetchOnMount: "always",
  });

  return {
    myEvents: data?.data || [],
    paginationMyEvents: data?.pagination,
    isLoading,
    error,
  };
};
