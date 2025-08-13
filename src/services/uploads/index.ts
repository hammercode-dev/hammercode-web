import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";

export const uploadsService = {
  /**
   * API to Uploads an image file to the server
   * @param image - The image file to upload
   * @param type - The type of the image
   * @param category - The category for the image
   */
  uploadImage(image: File, type: string, category: string): Promise<HttpResponse<{ file_name: string }>> {
    const data = new FormData();
    data.append("image", image);
    data.append("type", type);
    data.append("category", category);
    return fetcher.post("/images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
