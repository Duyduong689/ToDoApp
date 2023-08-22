import axiosBase, { baseURL } from "../utils/AxiosInstance";
import { useQuery } from "react-query";

const getListUsers = async () => {
  const response = await axiosBase.get(`${baseURL}/users`);
  return response.data;
};

export const useGetListUsers = () => {
  return useQuery("listUsers", getListUsers, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
const getUserTasks = async (userId) => {
  const response = await axiosBase.get(`${baseURL}/users/${userId}/todos`);
  return response.data;
};
const markDoneTask = async (taskId) => {
  const response = await axiosBase.patch(`${baseURL}/todos/${taskId}`, {
    completed: true,
  });
  return response.data;
};
export const userService = {
  useGetListUsers,
  getUserTasks,
  markDoneTask
};
