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

export const profileFormSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female"], { required_error: "Please select a gender" }),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  personal_web: z.string().url("Please enter a valid personal website URL").optional().or(z.literal("")),
});

export type ProfileFormType = z.infer<typeof profileFormSchema>;
