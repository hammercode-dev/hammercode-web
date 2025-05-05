interface PaginatedResponse {
  page?: number;
  limit?: number;
  total_count?: number;
  total_pages?: number;
}

export interface HttpResponse<T> extends PaginatedResponse {
  code: number;
  message: string;
  data: T;
}
