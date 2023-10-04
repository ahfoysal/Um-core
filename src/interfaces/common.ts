export interface IGenericResponse<T> {
  success?: boolean;
  statusCode?: number;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: {
    path: string;
    message: string;
  }[];
}
