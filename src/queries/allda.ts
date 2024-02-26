import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";

const fetchData: MutationFunction<ApiResponse<any>, void> = async () => {
  try {
    const res = await apiClient.get("api/feed/getAllVisibleFeeds");
    console.log("Data fetched successfully");
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Deletefeed = async (feedId: string) => {
  try {
    const response = await apiClient.post(`api/feed/deleteFeed/${feedId}`);
    console.log("Deleted done");
    

  } catch (error) {
    console.error("Error deleting feed:", error);
  }
};

export const useFetchDataQuery = () =>
  useMutation({
    mutationFn: fetchData,
  });

export const DeletingFeed = () =>
  useMutation({
    mutationFn: Deletefeed,
  });
