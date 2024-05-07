import {
  useMutation,
  MutationFunction,
  useQuery,
  QueryFunction,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const fetchData: Function = async (feedtype: string[]) => {
  const res = await apiClient.get(
    `api/feed/getAllVisibleFeeds?feedVisibileType=${feedtype.join(",")}`
  );
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
const updateFeed = async ({ id, data }: { id: string; data: FormData }) => {
  try {
    
    console.log(data);
    const response = await apiClient.post(`api/feed/editFeed/${id}`, data);
    console.log("Updated done");
    return response.data;
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

export const useFetchFeedDataQuery = ({ feedType }: { feedType: String[] }) => {
  return useQuery({
    queryKey: ["all-feed", feedType.join(",")],
    queryFn: () => fetchData(feedType),
  });
};


export const DeletingFeed = () =>
  useMutation({
    mutationFn: deleteFeed,
  });
export const useUpdateFeedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-feed"] });
    },
    onError: (err) => {
      // toast
    },
  });
};
