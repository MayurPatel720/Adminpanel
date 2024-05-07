import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const fetchService = async () => {
  const res = await apiClient.get(`api/serviceNew/getAllPrePaidServices`);
  return res.data;
};

const updateservice = async (data: any) => {
  try {
    console.log(data);
    const response = await apiClient.post(
      `api/serviceNew/editePrePaidService`,
      data
    );
    console.log("Updated done");
    return response.data;
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

const refundservice = async ( refundData:any) => {
  try {
    const aaa =  {
      userId: refundData.userId,
      roll: refundData.roll,
      percentage: refundData.inputValue,
    };
    const response = await apiClient.post(`api/serviceNew/cancelPrePaidServiceByAdmin/${refundData._id}`,aaa);
    return response.data;
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

const getdatatable = async (data: any) => {
  try {
    const response = await apiClient.get(
      `api/serviceNew/getPrePaidServiceUsers/${data}`
    );
    console.log("done");
    
    return response.data.data;
  } catch (error) {
    console.error("Error data come:", error);
    throw error;
  }
};

export const useServiceQuery = () => {
  return useQuery({
    queryKey: ["all-service"],
    queryFn: () => fetchService(),
  });
};

export const useTabledata = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["all-prepaidserviceuser", id],
    queryFn: () => getdatatable(id),
  });
};

export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateservice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-service"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
};

export const useRefundservice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refundservice,
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-prepaidserviceuser"] });
    },
  });
};


