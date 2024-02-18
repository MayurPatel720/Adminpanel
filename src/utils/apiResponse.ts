export interface ApiResponse<Type> {
  code: string;
  data: Type;
  message: string;
  success: string;
}
