export interface ResponseDto<T> {
  statusCode: number;
  statusDescription: string;
  message: string;
  requestId: number;
  error?: string;
  data: T;
}
