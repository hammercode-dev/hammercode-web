"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { eventsService } from "@/services/events";
import { uploadsService } from "@/services/uploads";
import { EventFormType, CreateEventPayload } from "@/domains/Events";
import DialogSuccess from "@/components/common/DialogGlobal/DialogSuccess";
import { useRouter } from "@/lib/navigation";
import { useDialog } from "@/contexts";
import DialogError from "@/components/common/DialogGlobal/DialogError";

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

export const useCreateEvent = (t: (key: string) => string) => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const submitMutation = useMutation({
    mutationKey: ["createEvent"],
    mutationFn: (payload: CreateEventPayload) => eventsService.createEventAdmin(payload),
    onSuccess: () => {
      openDialog({
        content: React.createElement(DialogSuccess, {
          title: t("EventForm.create-success-title"),
          description: t("EventForm.create-success-description"),
        }),
        confirmText: t("EventForm.back-to-list"),
        onConfirm: () => {
          router.push("/admin/events");
          closeDialog();
        },
        classAction: "sm:justify-center",
      });
    },
    onError: () => {
      openDialog({
        title: t("EventForm.create-error-title"),
        description: t("EventForm.create-error-description"),
        confirmText: "OK",
        classAction: "sm:justify-center",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: EventFormType) => uploadsService.uploadImageAdmin(payload.image, "events"),
    onSuccess: (data, variables) => {
      const filename = data.data.file_name;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = variables;
      submitMutation.mutate({
        ...rest,
        file_name: filename,
      });
    },
    onError: () => {
      openDialog({
        content: React.createElement(DialogError, {
          title: t("EventForm.upload-error-title"),
          description: t("EventForm.upload-error-description"),
        }),
        onConfirm: () => {
          closeDialog();
        },
        confirmText: "OK",
        classAction: "sm:justify-center",
      });
    },
  });

  const isLoading = createMutation.isPending || submitMutation.isPending;

  return {
    createMutation,
    submitMutation,
    isLoading,
  };
};
