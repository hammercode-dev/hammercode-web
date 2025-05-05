import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";

export const uploadsService = {
  uploadImage(image: File, type: string, category: string): Promise<HttpResponse<{ file_name: string }>> {
    const data = new FormData();
    data.append("image", image);
    data.append("type", type);
    data.append("category", category);
    return fetcher.post("/public/images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
