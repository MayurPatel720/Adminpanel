import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const getusersdatatable = async (userid: any) => {
  try {
    const response = await apiClient.get(
      `api/quize_responceRouter/getQuizeResponse/${userid}`
    );
    console.log(userid);
    return response.data.data;
  } catch (error) {
    console.error("Error data come:", error);
    throw error;
  }
};

export const useQuizTabledata = ({ quizid }: { quizid: string }) => {
  return useQuery({
    queryKey: ["all-prepaidserviceuser", quizid],
    queryFn: () => getusersdatatable(quizid),
  });
};
