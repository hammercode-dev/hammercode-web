export interface UserDetail {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  fullname: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  github_url: string;
  linkedin_url: string;
  personal_web_url: string;
  created_at: string;
  updated_at: string;
}

export interface AuthorDetail {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  fullname: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  github_url: string;
  linkedin_url: string;
  personal_web_url: string;
  created_at: string;
  updated_at: string;
}

export interface EventDetailForUser {
  id: number;
  title: string;
  description: string;
  slug: string;
  author_id: number;
  Author: AuthorDetail;
  image: string;
  date: string;
  type: string;
  location: string;
  duration: string;
  capacity: number;
  status: "open" | "soon" | "closed";
  tags: string[];
  speakers: string[];
  registration_link: string;
  price: number;
  reservation_start_date: string;
  reservation_end_date: string;
  created_at: string;
  additional_link?: string;
  session_type: string;
}

export interface UserEventResponse {
  id: number;
  order_no: string;
  event_id: number;
  user_id: string;
  image_proof_payment: string;
  payment_url: string;
  transaction_no: string;
  payment_date: string | null;
  status: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";
  created_at: string;
  event_detail: EventDetailForUser;
  user_detail: UserDetail;
}
