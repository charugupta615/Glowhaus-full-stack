import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://glowhaus-full-stack.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("businessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
