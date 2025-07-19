import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string().min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
