import { HttpResponse } from "@/types/http";
import { fetcher } from "../instance";

export const uploadsService = {
  /**
   * API to Uploads an image file to the server
   * @param image - The image file to upload
   * @param category - The category for the image
   */
  uploadImage(image: string | File, category: string): Promise<HttpResponse<{ file_name: string }>> {
    const data = new FormData();
    data.append("image", image);
    data.append("category", category);
    return fetcher.post("/images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  /**
   * API to Uploads an image file to the server
   * @param image - The image file to upload
   * @param category - The category for the image
   */
  uploadImageAdmin(image: string | File | undefined, category: string): Promise<HttpResponse<{ file_name: string }>> {
    const data = new FormData();
    data.append("image", image as File);
    data.append("category", category);
    return fetcher.post("/admin/images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  /**
   * API to update an image file to the server
   * @param image - The image file to upload
   * @param file_name - The file name of the image
   * @param category - The category for the image
   */
  updateImageAdmin(
    image: string | File | undefined,
    category: string,
    file_name: string
  ): Promise<HttpResponse<{ file_name: string }>> {
    const data = new FormData();
    data.append("image", image as File);
    data.append("category", category);
    return fetcher.put(`/admin/images/${file_name}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
