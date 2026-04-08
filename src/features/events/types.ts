import { EventDetailForUser, UserDetail } from "./types/userEvent";

type EventTypes = "Workshop" | "TechTalk" | "dll";
type EventStatus = "open" | "soon" | "closed";

export type TechEvent = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image_event: string;
  created_at?: string;
  updated_at?: string;
  type_event?: EventTypes;
  location?: string;
  duration?: string;
  capacity?: number;
  tags?: string[];
  registration_link?: string;
  speakers?: string[];
  status: EventStatus;
  price?: number;
};

export type EventInfoType = {
  id: number;
  icon: React.ReactNode;
};

export type PaymentDetailResponse = {
  id?: number;
  event_id?: number;
  user_id?: string;
  order_no: string;
  transaction_no: string;
  payment_date: string;
  status: string;
  payment_url: string;
  created_at: string;
  event_detail: EventDetailForUser;
  user_detail: UserDetail;
};
