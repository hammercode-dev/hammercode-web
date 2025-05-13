import { z } from "zod";

export const eventSchema = z
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
    created_by: z.number().optional(),
    updated_by: z.number().optional(),
    deleted_by: z.number().optional(),
    reservation_start_date: z.string().optional(),
    reseveration_end_date: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    deleted_at: z.null().optional(),
  })
  .optional();

export type EventType = z.infer<typeof eventSchema>;

export const registrationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name must be at least 1 character long"),
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits"),
  image_proof_payment: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Proof of payment is required",
    })
    .refine(
      (file) => {
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        return file instanceof File && validTypes.includes(file.type);
      },
      {
        message: "Only JPG, JPEG, and PNG files are accepted",
      }
    ),
  net_amount: z.number({ required_error: "Net amount is required" }).min(1, "Net amount must be at least 1"),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;
