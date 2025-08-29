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
  github_url: z.string(),
  linkedin_url: z.string(),
  personal_web_url: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ProfileResType = z.infer<typeof profileResSchema>;

export const createProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t("validation.username-required")),
    fullname: z.string().min(1, t("validation.fullname-required")),
    date_of_birth: z.string().min(1, t("validation.date-of-birth-required")),
    gender: z.string().min(1, t("validation.gender-required")),
    phone_number: z.string().min(1, t("validation.phone-number-required")),
    address: z.string().min(1, t("validation.address-required")),
    github_url: z.string().url(t("validation.github-invalid-url")).optional().or(z.literal("")),
    linkedin_url: z.string().url(t("validation.linkedin-invalid-url")).optional().or(z.literal("")),
    personal_web_url: z.string().url(t("validation.personal-web-invalid-url")).optional().or(z.literal("")),
  });

export type ProfileFormType = z.infer<ReturnType<typeof createProfileFormSchema>>;
