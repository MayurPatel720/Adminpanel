import { MutationFunction, useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";

interface Servicecreate {
  month: Number;
  year: Number;
  title: string;
  amount: Number;
  users: Array<string>;
  cancel_fee_percentage: Number;
  expiry_date: string;
  last_cancellation_date: string;
  is_cancellable: boolean;
  description: string;
  maxPaid_count: Number;
  maxCancelCount: Number;
}

const createService: MutationFunction<ApiResponse<any>, Servicecreate> = async (
  serviceData: Servicecreate
) => {
  const res = await apiClient.post(
    "api/serviceNew/createPrePaidService",
    serviceData
  );
  return res.data;
};

export const useCreateQuery = () => {
  return useMutation({
    mutationFn: createService,
  });
};
