import axios from "axios";

export const baseURL = "https://jsonplaceholder.typicode.com";
const axiosBase = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosBase;