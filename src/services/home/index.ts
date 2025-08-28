import axios from "axios";
import { TestimonialType } from "@/features/home/types";

export const homeService = {
  /**
   * API to Fetches all testimonials
   */
  async getAllTestimonial(): Promise<{ status: number; message: string; data: TestimonialType[] }> {
    const res = await axios.get("/api/testimonial");
    return res.data;
  },
};
