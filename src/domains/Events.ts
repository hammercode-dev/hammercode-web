import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  // content: z.string().optional(),
  slug: z.string().optional(),
  author: z.string(),
  image: z.string(),
  date: z.string().optional(),
  type: z.string(),
  location: z.string(),
  duration: z.string(),
  capacity: z.number(),
  date_event: z.string(),
  status: z.enum(["open", "soon", "closed"]),
  tags: z
    .array(
      z.object({
        id: z.number(),
        event_id: z.number(),
        tags: z.string(),
      })
    )
    .optional(),
  speakers: z
    .array(
      z.object({
        id: z.number(),
        event_id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  registration_link: z.string(),
  price: z.number(),
  reservation_start_date: z.string().optional(),
  reservation_end_date: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  deleted_at: z.string().optional(),
  additional_link: z.string().optional(),
});

export type EventType = z.infer<typeof eventSchema>;

export const registrationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits"),
  image_proof_payment: z.union([
    z
      .instanceof(File)
      .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/gif"].includes(file.type), {
        message: "Invalid image file type",
      }),
    z.string().min(1, "Image proof payment is required"),
  ]),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;

export const userEventSchema = z.object({
  id: z.number(),
  order_no: z.string(),
  event_id: z.number(),
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  image_proof_payment: z.string().url(),
  payment_date: z.string(),
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]),
  created_at: z.string(),
  event_detail: eventSchema,
});

export type UserEventType = z.infer<typeof userEventSchema>;
