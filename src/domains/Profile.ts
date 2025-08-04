import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  fullname: z.string(),
  date_of_birth: z.string(),
  gender: z.string(),
  phone_number: z.string(),
  address: z.string(),
  github: z.string(),
  linkedin: z.string(),
  personal_web: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
