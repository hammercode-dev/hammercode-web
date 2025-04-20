import { fetcherLocal } from "../instance";

export const homeService = {
  getAllTestimonial: async () => {
    const res = await fetcherLocal.get("/api/testimonial");
    return res.data;
  },
};
