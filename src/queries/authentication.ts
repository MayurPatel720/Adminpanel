import { useMutation, MutationFunction } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { setLocalStorage } from "../utils/localStorage";
import { ApiResponse } from "../utils/apiResponse";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../contants";
import axios from "axios";

interface LoginParams {
  email: string;
  password: string;
}
interface Question {
  question: string;
  options: Array<Option>;
}
interface Option {
  value: string;
  isAnswer: boolean;
}
interface QuizParams{
    title:string;
    start_time:string,
    end_time:string,
    questions:Array<Question>;
}

const login: MutationFunction<ApiResponse<any>, LoginParams> = async ({
  email,
  password,
}: LoginParams) => {
  const res = await apiClient.post("api/user/login", {
    email: email,
    password: password,
  });
  return res.data;
};
const quizadd: MutationFunction<ApiResponse<any>, QuizParams> = async({
  title,
  start_time,
  end_time,
  questions,
}: QuizParams) =>{
  const res= await axios.post("http://103.26.48.209:3001/api/quize/createQuize",{
    title:title,
    start_time:start_time,
    end_time:end_time,
    questions:questions,
  })
  return res.data;
}
export const AddQuiz = () => useMutation({
  mutationFn: quizadd,
  onSuccess: (data) => {
    const { accessToken, refreshToken } = data.data;
    setLocalStorage(ACCESS_TOKEN, accessToken);
    setLocalStorage(REFRESH_TOKEN, refreshToken);
  },
})

export const useLoginQuery = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
    },
  });
