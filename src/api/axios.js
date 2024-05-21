import axios from "axios";

const BASE_URL = "http://localhost:3500";
const BASE_URL_RECIPE = "https://www.themealdb.com/api/json/v1/1";

export default axios.create({
  baseURL: BASE_URL_RECIPE,
});

export const axiosBackend = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
