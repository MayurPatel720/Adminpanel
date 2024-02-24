import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { setLocalStorage } from "../utils/localStorage";
import { ApiResponse } from "../utils/apiResponse";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export interface FeedParams {
  title:string,
  description:string,
  expires_at:string,
  level:string,
  users:Array<string>,
}

const createFeed: MutationFunction<ApiResponse<any>, FeedParams> = async ({
  title,
  description,
  expires_at,
  level,
  users,
}: FeedParams) => {
const body ={
  ...(title && {title}),
  ...(description && {description}),
  ...(expires_at && {expires_at}),
  ...(level && {level}),
  ...(users && {users}),
}
  const res = await apiClient.post("api/feed/insertFeed", body);
  return res.data;
};

export const useCreateFeedQuery = () =>
  useMutation({
    mutationFn: createFeed,
  });
