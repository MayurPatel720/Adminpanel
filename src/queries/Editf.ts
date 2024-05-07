import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";

export interface FeedParams {
  title: string;
  description: string;
  expires_at: string;
  level: string;
  users: Array<string>;
  attachmentsToDelete: Array<string>;
}

const editFeed: MutationFunction<ApiResponse<any>, FeedParams> = async ({
  title,
  description,
  expires_at,
  level,
  users,
  attachmentsToDelete,
}: FeedParams) => {

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("expires_at", expires_at);
  formData.append("level", level);
  formData.append("users", JSON.stringify(users));
  formData.append("attachmentsToDelete", JSON.stringify(attachmentsToDelete));

  // Array.from(FeedImgVi).forEach((file) => {
  //   formData.append("FeedImgVi", file, file.name);
  // });


  const res = await apiClient.post("api/feed/editFeed", formData);
  
  console.log("Feed edited successfully");
  return res.data;
};

export const useEditFeedQuery = () =>
  useMutation({
    mutationFn: editFeed,
  });
