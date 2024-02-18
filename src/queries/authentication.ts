import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { setLocalStorage } from "../utils/localStorage";
import { ApiResponse } from "../utils/apiResponse";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../contants";

interface LoginParams {
  email: string;
  password: string;
}

const login: MutationFunction<ApiResponse<any>, LoginParams> = async ({
  email,
  password,
}: LoginParams) => {
  const res = await apiClient.post("v1/users/login", {
    userId: email,
    password: password,
  });
  return res.data;
};

export const useLoginQuery = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
    },
  });
