import {
  useMutation,
  MutationFunction,
  useQuery,
  QueryFunction,
  UseMutateFunction,
} from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { setLocalStorage } from "../utils/localStorage";
import { ApiResponse } from "../utils/apiResponse";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../contants";
import axios from "axios";
import Group from "../components/Group";
interface LoginParams {
  email: string;
  password: string;
}
interface Question {
  question: string;
  options: Array<Option>;
}
interface QuestionEdit {
  question: string;
  _id: string | null;
  options: Array<OptionEdit>;
}
interface OptionEdit {
  value: string;
  _id: string | null;
  isAnswer: boolean;
}
interface Option {
  value: string;
  isAnswer: boolean;
}
interface QuizParams {
  title: string;
  start_time: string;
  end_time: string;
  questions: Array<Question>;
  users: string[];
}
interface AllQParams {
  getQuizeById: string;
}
interface QuizData {
  _id: string;
  title: string;
}
interface QuizDelete {
  id: string;
}
interface GroupDelete {
  id: string;
}
interface QuizUpdate {
  // _id: string;
  title: string;
  start_time: string;
  end_time: string;
  questions: Array<QuestionEdit>;
}
interface QuizUpdatedData {
  id: string;
  updateData: QuizUpdate;
  users: string[];
}
interface Groupa {
  users: string[];
  name: string;
}
interface Groupu {
  users: string[];
  name: string;
  id: string;
}
interface groupdata {
  users: string[];
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
const Groupadd: MutationFunction<ApiResponse<any>, Groupa> = async ({
  users,
  name,
}: Groupa) => {
  const res = await apiClient.post("api/group/createGroup", {
    users: users,
    name: name,
  });
  return res.data as ApiResponse<any>;
};
const GroupUpdate: MutationFunction<ApiResponse<any>, Groupu> = async ({
  users,
  name,
  id,
}: Groupu) => {
  const res = await apiClient.post("api/group/updateGroup", {
    users: users,
    name: name,
    groupId: id,
  });
  return res.data as ApiResponse<any>;
};
const quizadd: MutationFunction<ApiResponse<any>, QuizParams> = async ({
  title,
  start_time,
  end_time,
  questions,
  users,
}: QuizParams) => {
  // console.log(users);

  const res = await apiClient.post("api/quize/createQuize", {
    title: title,
    start_time: start_time,
    end_time: end_time,
    questions: questions,
    users: users,
  });
  return res.data as ApiResponse<any>;
};
const fetchAllQuiz: any = async () => {
  const res = await apiClient.get(`api/quize/getAllQuize`);
  // console.log(" run ");
  return res.data as ApiResponse<any>;
};
const fetchallGroups: any = async () => {
  const res = await apiClient.get(`api/group/getAllGroup`);
  return res.data as ApiResponse<any>;
};
const fetchQuizMarks: any = async () => {
  const res = await apiClient.get(`api/quize/getAllQuize`);
  // console.log(" run ");
  return res.data as ApiResponse<any>;
};
const fetchQuizById: any = async (id: string) => {
  const res = await apiClient.get(`api/quize/getQuizeById/${id}`);
  return res.data;
};
const fetchGroupById: any = async (id: string) => {
  const res = await apiClient.get(`api/group/getGroupById/${id}`);
  return res.data;
};
const fetchdeleteQuiz: MutationFunction<ApiResponse<any>, QuizDelete> = async ({
  id,
}: QuizDelete) => {
  const response = await apiClient.delete(`api/quize/deleteQuize/${id}`);
  return response.data;
};
export const DeleteQuiz = () =>
  useMutation({
    mutationFn: fetchdeleteQuiz,
  });
const fetchdeleteGroup: MutationFunction<
  ApiResponse<any>,
  GroupDelete
> = async ({ id }: GroupDelete) => {
  // console.log(id);

  const res = await apiClient.post(`api/group/deleteGroup`, {
    groupId: id,
  });
  return res.data as ApiResponse<any>;
};
export const DeleteGroup = () =>
  useMutation({
    mutationFn: fetchdeleteGroup,
  });
const showall: MutationFunction<ApiResponse<any>, QuizDelete> = async ({
  id,
}: QuizDelete) => {
  // console.log("main run", id);
  const temp = "abc";
  const responseData: any = { data: temp };

  return responseData as ApiResponse<any>;
};
export const Mainfun = () =>
  useMutation({
    mutationFn: showall,
  });
export const Groupaddmutation = () =>
  useMutation({
    mutationFn: Groupadd,
  });
export const GroupUpdatemutation = () =>
  useMutation({
    mutationFn: GroupUpdate,
  });
export const useAllGroups = () =>
  useQuery<groupdata[], Error, any>({
    queryKey: ["allgroups"],
    queryFn: fetchallGroups,
  });
export const useAllQuiz = () =>
  useQuery<QuizData[], Error, any>({
    queryKey: ["allQuiz"], // Assuming getQuizeById is defined
    queryFn: fetchAllQuiz,
  });
export const useAllQuizMarks = () =>
  useQuery<QuizData[], Error, any>({
    queryKey: ["allQuizmarks"], // Assuming getQuizeById is defined
    queryFn: fetchQuizMarks,
  });
// <Promise<ApiResponse<any>>, Array<string>, AllQParams>,any,any,Array<string>>
export const useAllQuizbyId = (id?: string) =>
  useQuery({
    queryKey: ["allQuizbyId"], // Assuming getQuizeById is defined
    queryFn: () => fetchQuizById(id),
  });
export const useAllGroupbyId = (id?: string, enabled?: boolean) =>
  useQuery({
    queryKey: ["allQuizbyId", id], // Assuming getQuizeById is defined
    enabled: enabled || false,
    queryFn: () => fetchGroupById(id),
  });
const updateQuizById: MutationFunction<
  ApiResponse<any>,
  QuizUpdatedData
> = async ({
  id,
  updateData: { title, start_time, end_time, questions },
  users,
}: QuizUpdatedData) => {
  const res = await apiClient.post(`api/quize/updateQuize/${id}`, {
    updateData: {
      title: title,
      start_time: start_time,
      end_time: end_time,
      questions: questions,
      users: users,
    },
  });

  return res.data as ApiResponse<any>;
};
export const useUpdateQuiz = () =>
  useMutation({
    mutationFn: updateQuizById,
  });
export const AddQuiz = () =>
  useMutation({
    mutationFn: quizadd,
  });

export const useLoginQuery = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
    },
  });
