import { z } from "zod";

export const EventSchema = z
  .object({
    id: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    image_event: z.string().optional(),
    date_event: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    duration: z.string().optional(),
    capacity: z.number().optional(),
    status: z.string().optional(),
    Tags: z.null().optional(),
    Speakers: z.null().optional(),
    registration_link: z.string().optional(),
    price: z.number().optional(),
    created_by_user_id: z.number().optional(),
    updated_by_user_id: z.number().optional(),
    deleted_by_user_id: z.number().optional(),
    booking_start: z.string().optional(),
    booking_end: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    deleted_at: z.null().optional(),
  })
  .optional();

export type EventType = z.infer<typeof EventSchema>;

export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number is required"),
  image_proof_payment: z.string().min(1, "Proof of payment is required"),
  net_amount: z.number().min(1, "Net amount must be at least 1"),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;
