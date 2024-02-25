
import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { setLocalStorage } from "../utils/localStorage";
import { ApiResponse } from "../utils/apiResponse";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
export interface FeedParams {
  title: string;
  description: string;
  expires_at: string;
  level: string;
  users: Array<string>;
  FeedImgVi: Array<File>;
}

const createFeed: MutationFunction<ApiResponse<any>, FeedParams> = async ({
  title,
  description,
  expires_at,
  level,
  users,
  FeedImgVi,
}: FeedParams) => {

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("expires_at", expires_at);
  formData.append("level", level);
  formData.append("users", JSON.stringify(users));
  Array.from(FeedImgVi).forEach((file) => {
    formData.append("FeedImgVi", file, file.name);
  });

  const res = await apiClient.post("api/feed/insertFeed", formData);
  console.log("done");
  return res.data;
};

export const useCreateFeedQuery = () =>
  useMutation({
    mutationFn: createFeed,
  });