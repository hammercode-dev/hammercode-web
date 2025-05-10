import { fetcherLocal } from "../instance";
import { TestimonialType } from "@/features/home/types";

export const homeService = {
  getAllTestimonial(): Promise<{ status: number; message: string; data: TestimonialType[] }> {
    return fetcherLocal.get("/api/testimonial");
  },
};
