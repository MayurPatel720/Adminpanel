import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { ApiResponse } from "../utils/apiResponse";
export interface FeedParams {
  title: string;
  description: string;
  expires_at: string;
  level: string;
  users: Array<string>;
  FeedImgVi: Array<File>;
}

const alluser: QueryFunction<
  ApiResponse<Array<any>>,
  Array<String>,
  any
> = async () => {
  const res = await apiClient.get("api/user/allUsers");
  return res.data;
};
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
  users.forEach((user, index) => {
    formData.append(`users[${index}]`, user);
  });
  Array.from(FeedImgVi).forEach((file, index) => {
    formData.append(`FeedImgVi`, file, file.name);
  });
  Array.from(users).forEach((user, i) => {
    formData.append(`users[${i}]`, user);
  });
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

export const useGetalluser = () =>
  useQuery({
    queryKey: ["allusers"],
    queryFn: alluser,
  });
