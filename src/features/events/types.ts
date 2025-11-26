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
  order_no: string;
  transaction_no: string;
  payment_date: string;
  status: string;
  event_detail: {
    title: string;
    date: Date;
    type: string;
    location: string;
    duration: string;
    price: number;
    session_type: string;
  };
  user_detail: {
    fullname: string;
    email: string;
    phone_number: string;
  };
};
