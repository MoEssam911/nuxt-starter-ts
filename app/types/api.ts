export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId?: string;
  [key: string]: unknown;
}
