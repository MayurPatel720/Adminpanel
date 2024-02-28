import {
  useMutation,
  MutationFunction,
  useQuery,
  QueryFunction,
} from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";

const fetchData: QueryFunction<
  ApiResponse<any>,
  Array<String>,
  any
> = async () => {
  const res = await apiClient.get("api/feed/getAllVisibleFeeds");
  return res.data;
};

const deleteFeed = async (feedId: string) => {
  try {
    const response = await apiClient.post(`api/feed/deleteFeed/${feedId}`);
    console.log("Deleted done");
  } catch (error) {
    console.error("Error deleting feed:", error);
  }
};

const updateFeed = async ({
  id: editItemId,
  data: editedData,
}: {
  id: string;
  data: any;
}) => {
  try {
    const response = await apiClient.post(
      `api/feed/editFeed/${editItemId}`,
      editedData
    );
    console.log("Updated done");
    return response.data;
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

export const useFetchFeedDataQuery = () =>
  useQuery({
    queryKey: ["all-feed"],
    queryFn: fetchData,
  });

export const DeletingFeed = () =>
  useMutation({
    mutationFn: deleteFeed,
  });
export const useUpdateFeedMutation = () =>
  useMutation({
    mutationFn: updateFeed,
  });
