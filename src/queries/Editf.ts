// Import necessary dependencies
import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";

// Define the interface for feed parameters
export interface FeedParams {
  title: string;
  description: string;
  expires_at: string;
  level: string;
  users: Array<string>;
  FeedImgVi: Array<File>;
}

// Define the mutation function for editing feed
const editFeed: MutationFunction<ApiResponse<any>, FeedParams> = async ({
  title,
  description,
  expires_at,
  level,
  users,
  FeedImgVi,
}: FeedParams) => {
  // Create a new FormData object to send multipart form data
  const formData = new FormData();

  // Append parameters to the FormData object
  formData.append("title", title);
  formData.append("description", description);
  formData.append("expires_at", expires_at);
  formData.append("level", level);
  formData.append("users", JSON.stringify(users));

  // Append each file to the FormData object
  Array.from(FeedImgVi).forEach((file) => {
    formData.append("FeedImgVi", file, file.name);
  });

  // Send a POST request to the API endpoint for editing feed
  const res = await apiClient.post("api/feed/editFeed", formData);
  console.log("Feed edited successfully");
  return res.data;
};

// Define the custom hook for using the edit feed mutation
export const useEditFeedQuery = () =>
  useMutation({
    mutationFn: editFeed,
  });
