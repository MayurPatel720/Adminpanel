export interface ApiResponse<Type> {
  code: any;
  data: Type;
  message: string;
  success: string;
}
