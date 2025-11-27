import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";
import {
  AdminEventResponseType,
  CheckPaymentResponse,
  CreateEventPayload,
  EventType,
  // RegistrationForm,
} from "@/domains/Events";
import { UserEventResponse } from "@/features/events/types/userEvent";
import { PaymentDetailResponse } from "@/features/events/types";

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
  // registerEvent(payload: RegistrationForm): Promise<HttpResponse<{ order_no: string }>> {
  //   return fetcher.post("/events/registrations", payload);
  // },

  /**
   * API to retrieve the list of events owned by the current user.
   */
  async getMyEvents(page: number = 1, limit: number = 10, type?: string): Promise<HttpResponse<UserEventResponse[]>> {
    return fetcher.get(`/events/registrations`, {
      params: {
        page,
        limit,
        type,
      },
    });
  },

  /**
   * API to retrieve the list of events table for admin.
   */
  async getListEventsAdmin(
    page: number = 1,
    limit: number = 10,
    type?: string,
    search?: string
  ): Promise<HttpResponse<EventType[]>> {
    return fetcher.get(`/admin/events`, {
      params: {
        page,
        limit,
        type,
        title: search,
      },
    });
  },

  /**
   * API to create event for admin.
   */
  async createEventAdmin(payload: CreateEventPayload): Promise<HttpResponse<null>> {
    return fetcher.post(`/admin/events`, payload);
  },

  /**
   * API to get detail event for admin.
   */
  async getDetailEventAdmin(id: string): Promise<HttpResponse<AdminEventResponseType>> {
    return fetcher.get(`/admin/events/${id}`);
  },

  /**
   * API to update event for admin.
   */
  async updateEventAdmin(id: string, payload: CreateEventPayload): Promise<HttpResponse<null>> {
    return fetcher.put(`/admin/events/${id}`, payload);
  },

  async checkPaymentStatus(transaction_no: string): Promise<HttpResponse<CheckPaymentResponse>> {
    return fetcher.get(`/transactions/${transaction_no}/status`);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerEvent(event_id: number): Promise<HttpResponse<any>> {
    return fetcher.post(`/transactions`, { event_id });
  },

  async getPaymentDetail(order_no: string): Promise<HttpResponse<PaymentDetailResponse>> {
    return fetcher.get(`/orders/${order_no}`);
  },
};
