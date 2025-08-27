import { z } from "zod";

export const profileResSchema = z.object({
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
  created_at: z.date(),
  updated_at: z.date(),
});

export type ProfileResType = z.infer<typeof profileResSchema>;

export const createProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t("Profile.validation.username-required")),
    fullname: z.string().min(1, t("Profile.validation.fullname-required")),
    date_of_birth: z.string().min(1, t("Profile.validation.date-of-birth-required")),
    gender: z.enum(["Male", "Female"], { required_error: t("Profile.validation.gender-required") }),
    phone_number: z.string().min(1, t("Profile.validation.phone-number-required")),
    address: z.string().min(1, t("Profile.validation.address-required")),
    github: z.string().url(t("Profile.validation.github-invalid-url")).optional().or(z.literal("")),
    linkedin: z.string().url(t("Profile.validation.linkedin-invalid-url")).optional().or(z.literal("")),
    personal_web: z.string().url(t("Profile.validation.personal-web-invalid-url")).optional().or(z.literal("")),
  });

export type ProfileFormType = z.infer<ReturnType<typeof createProfileFormSchema>>;
